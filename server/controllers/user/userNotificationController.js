import Notification from "../../models/notificationModel.js";


export const getNotifications = async (req, res) => {
    const notifications = await Notification.find({ recipient: req.user.id , type: { $ne: "message" } })
      .populate('sender', 'fullname username profile')
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ notifications });
};

export const markAsRead = async (req, res) => {
    await Notification.updateMany(
      { recipient: req.user.id , type: { $ne: "message" } },
      { $set: { read: true } }
    );

    res.status(200).json({ message: "Notifications marked as read" });
};

export const getUnreadCount = async (req, res) => {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      type: { $ne: "message" },
      read: false
    });

    res.status(200).json({ count });
};


export const markMessageAsRead =async (req, res) => {
    await Notification.updateMany(
      { recipient: req.user.id , type: "message" },
      { $set: { read: true } }
    );

    res.status(200).json({ message: "Message notifications marked as read" });
}

export const getUnreadMessageCount = async (req, res) => {
    const count = await Notification.countDocuments({
      recipient: req.user.id,
      type: "message",
      read: false
    });

    res.status(200).json({ count });
}