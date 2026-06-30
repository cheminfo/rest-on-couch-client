import { produce } from 'immer';

import type { RocNewAttachment } from '../types.ts';
import type {
  CouchInlineAttachment,
  EntryDocumentDraft,
} from '../types_internal.ts';
import { assert } from '../util/assert.ts';

/**
 * Percent-encodes an attachment name for use in a request URL.
 * Each path segment is encoded individually so that `/` separators are kept,
 * while characters like `+` or spaces become `%2B` / `%20`. Without this, a
 * literal `+` in a filename reaches the server unencoded and is decoded back
 * to a space, so the attachment is not found.
 * @param name - The attachment name (may contain `/`).
 * @returns The encoded name safe to append to the document URL.
 */
export function encodeAttachmentName(name: string): string {
  return name.split('/').map(encodeURIComponent).join('/');
}

export async function addInlineUploads<ContentType, IdType>(
  entry: EntryDocumentDraft<ContentType, IdType>,
  attachments: RocNewAttachment[],
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

  return produce(entry, (draft: EntryDocumentDraft<unknown, unknown>) => {
    for (let i = 0; i < attachments.length; i++) {
      const attachment = attachments[i];
      const data = attachmentsBase64[i];
      assert(attachment, 'Unreachable: attachment is undefined');
      assert(data, 'Unreachable: base64 data is undefined');
      const newAttachment: CouchInlineAttachment = {
        content_type: attachment.content_type,
        data,
      };
      if (!draft._attachments) {
        draft._attachments = {};
      }
      draft._attachments[attachment.name] = newAttachment;
    }
  });
}

export function deleteInlineUploads<ContentType, IdType>(
  entry: EntryDocumentDraft<ContentType, IdType>,
  attachmentNames: string[],
) {
  return produce(entry, (draft) => {
    for (const name of attachmentNames) {
      delete draft._attachments?.[name];
    }
  });
}
