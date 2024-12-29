import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import commonReducer from "./commonSlice";

const store = configureStore({
    reducer: {
        currentUser: userReducer,
        common: commonReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;