/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from '../config/awsConnect.js';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './tmp/uploads');
    },
    filename: (req, file, cb) => {
      // eslint-disable-next-line no-param-reassign
      file.key = `${Date.now().toString()}_${file.originalname}`;
      cb(null, file.key);
    },
  }),
  s3: multerS3({
    s3,
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const time = Date.now().toString();
      cb(null, `${time}_${file.originalname}`);
    },
  }),
};

export default multer({
  storage: storageTypes.s3,
  fileFilter: (req, file, cb) => {
    const extensaoImg = ['image/png', 'image/jpeg', 'image/jpg']
      .find((formatoAcept) => formatoAcept === file.mimetype);
    if (extensaoImg) return cb(null, true);
    return cb(null, false);
  },
});
