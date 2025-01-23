import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getNotifications ,getUnreadCount , markAsRead ,getUnreadMessageCount,
    markMessageAsRead
 } from "../controllers/user/userNotificationController.js";
import tryCatch from "../utilities/tryCatch.js";


const router = express.Router();

router.use(verifyToken);

router.get("/notifications", tryCatch(getNotifications));
router.get("/unread-count", tryCatch(getUnreadCount));
router.put("/mark-read", tryCatch(markAsRead));
router.get("/unread-message-count", tryCatch(getUnreadMessageCount));
router.put("/mark-message-read", tryCatch(markMessageAsRead));

export default router;