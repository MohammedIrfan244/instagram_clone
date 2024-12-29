import CustomError from "../../utilities/customError.js";


const postOneFile = async (req, res, next) => {
  if (!req.file) {
    return next(new CustomError("Please upload a file", 400));
  }
  res
    .status(200)
    .json({
      message: "File uploaded successfully",
      file: {
        url: req.uploadedFile.secure_url,
        public_id: req.uploadedFile.public_id,
        filename: req.uploadedFile.original_filename,
      },
    });
};

export { postOneFile};