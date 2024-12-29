import { createSlice } from "@reduxjs/toolkit";
import { UserDetail } from "../utilities/interfaces";


interface UserState {
  currentUser: null | UserDetail;
}
const userDetail = localStorage.getItem("user");

const initialState: UserState = {
    currentUser: userDetail ? JSON.parse(userDetail) : null,
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state:UserState, action): void => {
      state.currentUser = action.payload;
    },
    updateUserProfilePicture:(state:UserState,action):void=>{
      if(state.currentUser){
        state.currentUser.profile=action.payload
    }
  },
  },
});

export const { setCurrentUser , updateUserProfilePicture} = userSlice.actions;
export default userSlice.reducer;
