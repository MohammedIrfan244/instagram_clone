import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getNotifications ,getUnreadCount , markAsRead ,getUnreadMessageCount,
    markMessageAsRead
 } from "../controllers/user/userNotificationController.js";
import tryCatch from "../utilities/tryCatch.js";


const router = express.Router();

router.use(verifyToken);

router.get("/notifications", tryCatch(getNotifications));
router.get("/unread_count", tryCatch(getUnreadCount));
router.put("/mark-read", tryCatch(markAsRead));
router.get("/unread_message_count", tryCatch(getUnreadMessageCount));
router.put("/mark_message_read", tryCatch(markMessageAsRead));

export default router;