import {
  S3Client,
  GetObjectCommand,
  GetObjectCommandInput,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { Secret } from '../entities/secrets.entity';

export const getFileFromS3 = async (input: GetObjectCommandInput, secrets: Secret) => {
  const client = new S3Client({
    region: secrets.AWS_REGION_PRICE,
    credentials: {
      accessKeyId: secrets.AWS_ACCESS_KEY_ID_PRICE,
      secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY_PRICE,
    },
  });

  const command = new GetObjectCommand(input);
  const response = await client.send(command);

  return response;
};

export const uploadFileToS3 = async (csvBody: string, secrets: Secret) => {
  const client = new S3Client({
    region: secrets.AWS_REGION_PRICE,
    credentials: {
      accessKeyId: secrets.AWS_ACCESS_KEY_ID_PRICE,
      secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY_PRICE,
    },
  });

  const actualDateInMs = new Date().getTime();

  const command = {
    Key: `Index-Manual-${actualDateInMs}.csv`,
    Bucket: process.env.AWS_INDEX_MANUAL_TABLE_PRICE as string,
    Body: csvBody,
  } as PutObjectCommandInput;

  await client.send(new PutObjectCommand(command));
};
