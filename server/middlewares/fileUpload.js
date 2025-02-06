import cloudinary from "../config/cloudinaryConfig.js";
import { PassThrough } from "stream";
import CustomError from "../utilities/customError.js";
import logger from "../utilities/logger.js";

const uploadToCloudinary = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new CustomError("Please upload a file", 400));
    }

    const buffer = req.file.buffer;
    const resourceType = req.file.mimetype.startsWith("image") ? "image" : "video";

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: "Insta_clone_uploads",
      },
      (err, result) => {
        if (err) {
          logger.error(err);
          return next(new CustomError("Failed to upload to Cloudinary", 500));
        }

        req.uploadedFile = result;
        next();
      }
    );

    const bufferStream = new PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    logger.error(error);
    next(new CustomError("An unexpected error occurred", 500));
  }
};

export { uploadToCloudinary };