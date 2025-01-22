import Notification from "../../models/notificationModel.js";


export const getNotifications = async (req, res) => {
    const notifications = await Notification.find({ recipient: req.user.id })
      .populate('sender', 'fullname username profile')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ notifications });
};

export const markAsRead = async (req, res) => {
    await Notification.updateMany(
      { recipient: req.user.id },
      { $set: { read: true } }
    );

    res.status(200).json({ message: "Notifications marked as read" });
};

export const getUnreadCount = async (req, res) => {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      read: false
    });

    res.status(200).json({ count });
};