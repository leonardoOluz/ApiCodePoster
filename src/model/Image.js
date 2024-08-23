/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import s3 from '../config/awsConnect.js';
import s3DeleteObject from '../utils/aws-s3.js';

const ImageSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  name: {
    type: String,
  },
  size: {
    type: Number,
  },
  key: {
    type: String,
  },
  url: {
    type: String,
  },
}, { timestamps: true, versionKey: false });

// eslint-disable-next-line func-names
ImageSchema.pre('findOneAndDelete', async function (next) {
  const docToDelete = await this.model.findOne(this.getQuery()).exec();
  await s3DeleteObject(docToDelete.key);
});

const images = mongoose.model('images', ImageSchema);

export {
  images,
  ImageSchema,
};
