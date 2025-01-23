import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  _id: string;
  type: string;
  sender: {
    _id: string;
    fullname: string;
    username: string;
    profile: string;
  };
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  messageUnreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  messageUnreadCount: 0
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAllAsRead: (state) => {
      state.notifications = state.notifications.map(notif => ({ ...notif, read: true }));
      state.unreadCount = 0;
    },
    markMessageAsRead: (state) => {
      state.messageUnreadCount = 0;
    },
    setMessageUnreadCount: (state, action: PayloadAction<number>) => {
      state.messageUnreadCount = action.payload;
    },
    addMessageNotification: (state) => {
      state.messageUnreadCount += 1;
  }
  }
});

export const { setNotifications, setUnreadCount, addNotification, markAllAsRead , addMessageNotification,setMessageUnreadCount,markMessageAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;