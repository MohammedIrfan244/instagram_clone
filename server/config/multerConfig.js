import multer from "multer";
import CustomError from "../utilities/customError";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb, next) => {
  const allowedMimeTypes = /jpeg|jpg|png|gif|mp4/;
  const isValidate = allowedMimeTypes.test(file.mimetype);
  if (isValidate) {
    cb(null, true);
  } else {
    cb(next(new CustomError("Invalid file type", 400)), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 50 },
  fileFilter: fileFilter,
});

export default upload
