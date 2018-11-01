import { produce } from 'immer';

import {
  ICouchInlineAttachment,
  IDocument,
  IDocumentWithInlineAttachments,
  INewAttachment
} from './RocBase';

export async function addInlineUploads(
  entry: IDocument,
  attachments: INewAttachment[]
) {
  const attachmentsBase64 = await Promise.all(
    attachments.map((attachment) => {
      if (typeof attachment.data === 'string') {
        return Promise.resolve(attachment.data);
      } else {
        // Buffer
        return Promise.resolve(attachment.data.toString('base64'));
      }
    })
  );

  const newEntry: IDocumentWithInlineAttachments = produce(
    entry,
    (draft: IDocumentWithInlineAttachments) => {
      for (let i = 0; i < attachments.length; i++) {
        const newAttachment: ICouchInlineAttachment = {
          content_type: attachments[i].content_type,
          data: attachmentsBase64[i]
        };
        draft._attachments[attachments[i].name] = newAttachment;
      }
    }
  );

  return newEntry;
}

export function deleteInlineUploads(
  entry: IDocument,
  attachmentNames: string[]
) {
  return produce(entry, (draft) => {
    for (const name of attachmentNames) {
      delete draft._attachments[name];
    }
  });
}
