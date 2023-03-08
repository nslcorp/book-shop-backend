import { copyFile } from '@functions/importFileParser/libs/copyFile';
import { createReadableStream } from '@functions/importFileParser/libs/createReadableStream';
import { deleteFile } from '@functions/importFileParser/libs/deleteFile';
import { middyfy } from '@libs/lambda';
import { S3CreateEvent } from 'aws-lambda';

const importFileParser = async (event: S3CreateEvent) => {
  try {
    for (const record of event.Records) {
      const { key } = record.s3.object;
      console.log(key);
      await createReadableStream(key);
      await copyFile(key);
      await deleteFile(key);
    }

    console.log('[Lambda:importFileParser] finish.');
  } catch (error) {
    if (error.message) {
      console.log('[ERROR][Lambda:importFileParser] finish.');
      return;
    }
    const message = 'Error::importProductsFile unhandled error. See details in log.';
    console.log(message);
  }
};

export const main = middyfy(importFileParser);
