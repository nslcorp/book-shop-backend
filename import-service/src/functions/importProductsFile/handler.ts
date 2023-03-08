import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import cors from '@middy/http-cors';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { S3 } from 'aws-sdk';
import { promisify } from 'util';

const s3 = new S3();
const getSignedURL = promisify(s3.getSignedUrl.bind(s3));

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<void> = async (event) => {
  const { name } = event.queryStringParameters;
  if (!name) {
    return formatJSONResponse(
      { message: 'One of queryStringParameters is missing [name:string]' },
      400
    );
  }

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `uploaded/${name}`,
    Expires: 120, // time in sec
    ContentType: 'text/csv',
  };
  try {
    const data = await getSignedURL('putObject', params);
    return formatJSONResponse(data);
  } catch (error) {
    if (error.message) {
      return formatJSONResponse({ message: error.message }, 400);
    }
    const message = 'Error::importProductsFile unhandled error. See details in log.';
    return formatJSONResponse({ message }, 500);
  }
};

export const main = middyfy(importProductsFile).use(middyJsonBodyParser()).use(cors());
