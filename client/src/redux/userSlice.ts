import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: null | object;
    }

    const userDetail = localStorage.getItem('user')

const initialState: UserState = {
    user: userDetail ? JSON.parse(userDetail) : null,
};



const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;