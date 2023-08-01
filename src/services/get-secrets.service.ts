import { SecretsManager } from '@aws-sdk/client-secrets-manager';

const secretsManager = new SecretsManager({
  region: process.env.AWS_REGION as string,
});

export const getSecretValue = (secretId: string): Promise<any> => new Promise((resolve, reject) => {
  secretsManager.getSecretValue(
    {
      SecretId: secretId,
    },
    (err, data) => {
      if (err) {
        reject(err);
      } else {
        const secret = JSON.parse(data?.SecretString || '');
        resolve(secret);
      }
    },
  );
});
