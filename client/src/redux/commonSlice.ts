import { createSlice } from "@reduxjs/toolkit";


interface CommonState{
    profileModal:boolean
    followList:boolean
}

const INITIALSTATE:CommonState={
    profileModal:false,
    followList:false
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
        }
    },
})

export const {openProfileModal,closeProfileModal,openFollowList,closeFollowList}=commonSlice.actions
export default commonSlice.reducer

