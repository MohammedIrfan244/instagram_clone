import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import commonReducer from "./commonSlice";
import notificationReducer from "./notificationSlice"

const store = configureStore({
    reducer: {
        currentUser: userReducer,
        common: commonReducer,
        notification:notificationReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;