import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFilder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFilder,
  storage: multer.diskStorage({
    destination: tmpFilder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
