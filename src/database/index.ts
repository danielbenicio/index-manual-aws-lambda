import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import * as dynamoose from 'dynamoose';

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_PRICE as string,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_PRICE as string,
};

const dynamoDBClient = new DynamoDBClient({
  credentials,
  region: process.env.AWS_REGION_PRICE,
});
const dynamooseDB = new dynamoose.aws.sdk.DynamoDB({
  credentials,
  region: process.env.AWS_REGION_PRICE,
});

// Set DynamoDB instance to the Dynamoose DDB instance
const getDynamoose = () => {
  dynamoose.aws.ddb.set(dynamooseDB);
  return dynamoose;
};

export {
  dynamoDBClient,
  getDynamoose,
};
