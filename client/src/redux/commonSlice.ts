import { createSlice } from "@reduxjs/toolkit";


interface CommonState{
    profileModal:boolean
    followList:boolean
    postPopup:boolean
    createPopup:boolean
    storyPopup:boolean
    optionsPopup:boolean
    storyDetailsPopup:boolean
}

const INITIALSTATE:CommonState={
    profileModal:false,
    followList:false,
    optionsPopup:false,
    postPopup:false,
    storyPopup:false,
    createPopup:false,
    storyDetailsPopup:false
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
        },
        openOptionsPopup:(state:CommonState):void=>{
            state.optionsPopup=true
        },
        closeOptionsPopup:(state:CommonState):void=>{
            state.optionsPopup=false
        },
        openCretePopup:(state:CommonState):void=>{
            state.createPopup=true
        },
        closeCretePopup:(state:CommonState):void=>{
            state.createPopup=false
        },
        openStoryPopup:(state:CommonState):void=>{
            state.storyPopup=true
        },
        closeStoryPopup:(state:CommonState):void=>{
            state.storyPopup=false
        },
        closeStoryDetailsPopup:(state:CommonState):void=>{
            state.storyDetailsPopup=false
        },
        openStoryDetailsPopup:(state:CommonState):void=>{
            state.storyDetailsPopup=true
        }
    },
})

export const {openProfileModal,closeProfileModal,openStoryPopup,openStoryDetailsPopup,closeStoryDetailsPopup,closeStoryPopup,openOptionsPopup,openCretePopup,closeCretePopup,closeOptionsPopup,openFollowList,closeFollowList,openPostPopup,closePostPopup}=commonSlice.actions
export default commonSlice.reducer