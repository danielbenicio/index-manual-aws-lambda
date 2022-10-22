import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';

const region = process.env.AWS_REGION_PRICE as string;

const client = new S3Client({
  region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_PRICE as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_PRICE as string,
  },
});

export const getFileFromS3 = async (input: GetObjectCommandInput) => {
  const command = new GetObjectCommand(input);
  const response = await client.send(command);

  return response;
};

export const uploadFileToS3 = async (csvBody: string) => {
  const command = {
    Key: 'Index Manual.csv',
    Bucket: process.env.AWS_INDEX_MANUAL_TABLE_PRICE as string,
    Body: csvBody,
  } as PutObjectCommandInput;

  await client.send(new PutObjectCommand(command));
};
