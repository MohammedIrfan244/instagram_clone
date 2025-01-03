import { createSlice } from "@reduxjs/toolkit";


interface CommonState{
    profileModal:boolean
    followList:boolean
    postPopup:boolean
}

const INITIALSTATE:CommonState={
    profileModal:false,
    followList:false,
    postPopup:false
}

export const commonSlice=createSlice({
    name:"common",
    initialState:INITIALSTATE,
    reducers:{
        openProfileModal:(state:CommonState):void=>{
            state.profileModal=true
        },
        closeProfileModal:(state:CommonState):void=>{
            state.profileModal=false
        },
        openFollowList:(state:CommonState):void=>{
            state.followList=true
        },
        closeFollowList:(state:CommonState):void=>{
            state.followList=false
        },
        openPostPopup:(state:CommonState):void=>{
            state.postPopup=true
        },
        closePostPopup:(state:CommonState):void=>{
            state.postPopup=false
        }
    },
})

export const {openProfileModal,closeProfileModal,openFollowList,closeFollowList,openPostPopup,closePostPopup}=commonSlice.actions
export default commonSlice.reducer

