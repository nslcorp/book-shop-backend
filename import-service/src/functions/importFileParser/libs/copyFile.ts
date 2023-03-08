import { getAppVariables } from '@libs/getAppConstants';
import { S3 } from 'aws-sdk';
const s3 = new S3();

export const copyFile = async (fileKey: string) => {
  const { bucketName, uploadFolder, parsedFolder } = getAppVariables();

  const params: S3.Types.CopyObjectRequest = {
    Bucket: bucketName,
    CopySource: `${bucketName}/${fileKey}`,
    Key: fileKey.replace(uploadFolder, parsedFolder),
  };
  await s3.copyObject(params).promise();

  const message = `[S3:CopyFile] file: ${fileKey} copied successfully.`;
  console.log(message);
};
