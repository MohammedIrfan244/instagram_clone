import mongoose from "mongoose";

const idValidation = (req, res, next) => {
    console.log(req.params)
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Id is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id" });
    }
    next();
};

export default idValidation