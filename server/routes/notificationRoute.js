import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getNotifications ,getUnreadCount , markAsRead } from "../controllers/user/userNotificationController.js";
import tryCatch from "../utilities/tryCatch.js";


const router = express.Router();

router.use(verifyToken);

router.get("/notifications", tryCatch(getNotifications));
router.get("/unread_count", tryCatch(getUnreadCount));
router.put("/mark-read", tryCatch(markAsRead));

export default router;