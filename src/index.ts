import { Readable } from 'stream';
import { S3Event } from 'aws-lambda';
import {
  GetObjectCommandInput,
} from '@aws-sdk/client-s3';

import { getFileFromS3, uploadFileToS3 } from './config/bucket';

import { IndexManual } from './entities/index-manual.entity';

import { parseCsvToJson } from './services/csv-parser.service';
import { getIndexes, uploadIndexesManual } from './services/upload-indexes-manual.service';
import { convertJSONToCSV } from './services/convert-json-to-csv.service';

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
      csvFile.Body as unknown as Readable,
    ) as IndexManual[];

    console.log('Starting to save items in Dynamo');
    await uploadIndexesManual(indexesManual);

    console.log('Starting to get items in Dynamo');
    const indexes = await getIndexes();

    console.log('Converting JSON to CSV');
    const indexesCsv = await convertJSONToCSV(indexes);

    console.log('Uploading file to S3');
    await uploadFileToS3(indexesCsv);

    console.log('Process has ended');
  } catch (err) {
    console.log(err);
  }
};
