import { getAppVariables } from '@libs/getAppConstants';
import { S3 } from 'aws-sdk';
const s3 = new S3();

export const deleteFile = async (fileKey) => {
  const { bucketName } = getAppVariables();

  const params: S3.Types.DeleteObjectRequest = {
    Bucket: bucketName,
    Key: fileKey,
  };
  await s3.deleteObject(params).promise();

  const message = `[S3:DeleteFile] file: ${fileKey} deleted successfully.`;
  console.log(message);
};
