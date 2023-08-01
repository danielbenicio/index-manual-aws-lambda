import * as dynamoose from 'dynamoose';
import { Secret } from '../entities/secrets.entity';

const getDynamoose = (secrets: Secret) => {
  const credentials = {
    accessKeyId: secrets.AWS_ACCESS_KEY_ID_PRICE,
    secretAccessKey: secrets.AWS_SECRET_ACCESS_KEY_PRICE,
  };

  const dynamooseDB = new dynamoose.aws.sdk.DynamoDB({
    credentials,
    region: secrets.AWS_REGION_PRICE,
  });

  dynamoose.aws.ddb.set(dynamooseDB);
  return dynamoose;
};

export { getDynamoose };
