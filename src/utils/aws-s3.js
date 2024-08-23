/* eslint-disable import/extensions */
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/awsConnect.js';

const s3DeleteObject = async (filename) => {
  const params = {
    Key: filename,
    Bucket: process.env.BUCKET_NAME,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};

export default s3DeleteObject;
