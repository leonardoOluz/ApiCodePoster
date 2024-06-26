/* eslint-disable import/no-extraneous-dependencies */
import { afterAll, beforeAll } from '@jest/globals';
import mongoose from 'mongoose';
import 'dotenv/config';

beforeAll(async () => {
  await mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
});
