import {
  S3Client, GetObjectCommand, GetObjectCommandInput,
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
