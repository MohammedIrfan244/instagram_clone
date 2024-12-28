import cloudinary from "../config/cloudinaryConfig.js";
import { PassThrough } from "stream";
import CustomError from "../utilities/customError.js";

const uploadToCloudinay = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new CustomError("Please upload a file", 400));
    }
    const buffer = req.file.buffer;
    const resourceType = req.file.mimetype.startsWith("image")
      ? "image"
      : "video";
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: "Insta_clone_uploads",
      },
      (err, result) => {
        if (err) {
          return next(new CustomError("Something went wrong", 500));
        }
        req.uploadedFile = result;
        next();
      }
    );
    const bufferStream = new PassThrough();
    bufferStream.end(buffer);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    console.log(error);
  }
};

export { uploadToCloudinay };
