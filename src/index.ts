import internal from 'stream';
import { S3Event } from 'aws-lambda';
import {
  GetObjectCommandInput,
} from '@aws-sdk/client-s3';

import { getFileFromS3 } from './config/bucket';
import { parseCsvToJson } from './services/csv-parser.service';
import { uploadIndexesManual } from './services/upload-indexes-manual.service';
import { IndexManual } from './entities/index-manual.entity';

export const lambdaHandler = async (event: S3Event) => {
  console.log('Lambda has been started');

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  const params: GetObjectCommandInput = {
    Bucket: bucket,
    Key: key,
  };

  try {
    const csvFile = await getFileFromS3(params);

    const indexesManual = await parseCsvToJson(
      csvFile.Body as unknown as internal.Readable,
    ) as IndexManual[];

    console.log('Starting to save items in Dynamo');
    await uploadIndexesManual(indexesManual);

    console.log('Process has ended');
  } catch (err) {
    console.log(err);
  }
};
