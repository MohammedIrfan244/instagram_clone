import { createSlice } from "@reduxjs/toolkit";


interface CurrentUser{
    id: string,
    email: string,
    password: string,
    fullname: string,
    username: string
    profile: string
    gender: string
    bio: string
}

interface UserState {
  currentUser: null | CurrentUser;
}
const userDetail = localStorage.getItem("user");

const initialState: UserState = {
    currentUser: userDetail ? JSON.parse(userDetail) : null,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
