import { produce } from 'immer';

import {
  ICouchInlineAttachment,
  IDocumentDraft,
  INewAttachment,
} from '../types';

export async function addInlineUploads<ContentType>(
  entry: IDocumentDraft<ContentType>,
  attachments: INewAttachment[],
) {
  const attachmentsBase64 = await Promise.all(
    attachments.map((attachment) => {
      if (typeof attachment.data === 'string') {
        return Promise.resolve(attachment.data);
      } else if (typeof window === 'undefined') {
        // in node, expect buffer
        const data = attachment.data as Buffer;
        return Promise.resolve(data.toString('base64'));
      } else {
        // in browser, expect Blob
        return new Promise<string>((resolve, reject) => {
          // @ts-expect-error Blob not understood by nodejs
          const data = attachment.data as Blob;
          const reader = new FileReader();
          reader.addEventListener('load', function load() {
            // convert image file to base64 string
            const base64Url = reader.result as string;
            const data = base64Url.slice(base64Url.indexOf(',') + 1);
            resolve(data);
          });
          reader.addEventListener('error', () => {
            reject(new Error('error with readAsDataURL'));
          });
          reader.readAsDataURL(data);
        });
      }
    }),
  );

  const newEntry = produce(entry, (draft: IDocumentDraft) => {
    for (let i = 0; i < attachments.length; i++) {
      const newAttachment: ICouchInlineAttachment = {
        content_type: attachments[i].content_type,
        data: attachmentsBase64[i],
      };
      if (!draft._attachments) {
        draft._attachments = {};
      }
      draft._attachments[attachments[i].name] = newAttachment;
    }
  });

  return newEntry;
}

export function deleteInlineUploads<ContentType>(
  entry: IDocumentDraft<ContentType>,
  attachmentNames: string[],
) {
  return produce(entry, (draft) => {
    for (const name of attachmentNames) {
      delete draft._attachments[name];
    }
  });
}
