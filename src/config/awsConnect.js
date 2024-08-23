import { S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  },
});

export default s3;
