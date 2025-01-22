// routes/messageRoute.js
import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { sendMessage, getConversation, getConversationList } from "../controllers/user/userMessageController.js";
import tryCatch from "../utilities/tryCatch.js";

const router = express.Router();

// Apply verifyToken middleware to all message routes
router.use(verifyToken);

router.post("/send", tryCatch(sendMessage));
router.get("/conversation/:userId", tryCatch(getConversation));
router.get("/conversations", tryCatch(getConversationList));

export default router;