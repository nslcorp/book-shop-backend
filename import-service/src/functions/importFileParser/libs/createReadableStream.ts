import { getAppVariables } from '@libs/getAppConstants';
import { S3 } from 'aws-sdk';

const { parse } = require('csv-parse');
import { promisify } from 'util';

const s3 = new S3();
const parsePromise = promisify(parse);

export const createReadableStream = (fileKey) =>
  new Promise(async (resolve, reject) => {
    const { bucketName } = getAppVariables();

    const params: S3.Types.GetObjectRequest = {
      Bucket: bucketName,
      Key: fileKey,
    };
    const fileStream = await s3.getObject(params).createReadStream();
    parsePromise({ columns: true });

    fileStream.on('data', (data) => {
      console.log(`[S3:ReadableStream] file:${fileKey}`, data);
      resolve(data);
    });

    fileStream.on('end', () => {
      console.log(`[S3:ReadableStream] parse finish.`);
    });

    fileStream.on('error', (error) => reject(error));
  });
