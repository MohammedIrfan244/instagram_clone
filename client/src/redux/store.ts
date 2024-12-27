import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        currentUser: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;