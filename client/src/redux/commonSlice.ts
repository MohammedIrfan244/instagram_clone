import { createSlice } from "@reduxjs/toolkit";


interface CommonState{
    profileModal:boolean
}

const INITIALSTATE:CommonState={
    profileModal:false
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
        }
    },
})

export const {openProfileModal,closeProfileModal}=commonSlice.actions
export default commonSlice.reducer

