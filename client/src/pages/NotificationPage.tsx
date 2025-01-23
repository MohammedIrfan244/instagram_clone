import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { markAllAsRead } from '../redux/notificationSlice';
import { format } from 'date-fns';
import axiosInstance from '../utilities/axiosInstance';
import axiosErrorManager from '../utilities/axiosErrorManager';

interface Notification {
    _id: string;
    type: string;
    read: boolean;
    sender: {
        profile: string;
        username: string;
        fullname: string;
    };
    createdAt: string;
}



function NotificationPage() {
    const dispatch = useDispatch();
    const { notifications } = useSelector((state: RootState) => state.notification);

    useEffect(() => {
        // Mark as read
        const markAsRead = async () => {
            try {
                await axiosInstance.put('/notification/mark-read');
                dispatch(markAllAsRead());
            } catch (error) {
                console.log(axiosErrorManager(error))
            }
        };
        markAsRead();
    }, [dispatch]);

    const getNotificationText = (notification: Notification) => {
        switch (notification.type) {
            case 'follow':
                return 'started following you';
            case 'message':
                return 'sent you a message';
            default:
                return 'interacted with you';
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Notifications</h2>
            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No notifications yet</p>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`p-4 rounded-lg ${notification.read ? 'bg-gray-800' : 'bg-gray-700'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={notification.sender.profile}
                                    alt={notification.sender.username}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <p>
                                        <span className="font-semibold">
                                            {notification.sender.fullname}
                                        </span>{' '}
                                        {getNotificationText(notification)}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {format(new Date(notification.createdAt), 'PPp')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default NotificationPage;