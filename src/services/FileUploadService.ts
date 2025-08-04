import multer from 'multer';
import path from 'path';
import { BadRequestException } from '../utils/exceptions/BadRequestException.js';

const MAX_SIZE_MB = 10;
const ALLOWED_EXTENSIONS = ['.csv', '.xls', '.xlsx'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    // Usamos BadRequestException para que nuestro ErrorHandler principal lo capture
    return cb(new BadRequestException('Only .csv, .xls, .xlsx files are allowed'));
  }
  cb(null, true);
};

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
  fileFilter
});