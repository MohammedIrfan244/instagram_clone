import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeFollowList } from "../redux/commonSlice";
import axiosInstance from "../utilities/axiosInstance";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { User } from "../utilities/interfaces";
import { IoClose } from "react-icons/io5";


interface FollowListProps {
  title: string;
  _id:string
  removeFollower:(id:string)=>void
}

interface FollowerList{
  follower:User
}

interface FollowingList{
  following:User
}

function FollowList({ title ,_id,removeFollower}: FollowListProps): JSX.Element {
  const dispatch=useDispatch()
  const [followerList,setFollowerList]=useState<FollowerList[]>([])
  const [followingList,setFollowingList]=useState<FollowingList[]>([])

  const getFollowerList=async()=>{
    try {
      const response=await axiosInstance.get(`/user/follower_list/${_id}`)
      setFollowerList(response.data.followers)
      console.log(response.data.followers)
    } catch (error) {
      console.log(axiosErrorManager(error))
    }
  }
  const getFollowingList=async()=>{
    try {
      const response=await axiosInstance.get(`/user/following_list/${_id}`)
      setFollowingList(response.data.following)
      console.log(response.data.follwing)
    } catch (error) {
      console.log(axiosErrorManager(error))
    }
  }

  useEffect(()=>{
    if(title==="Followers"){
      getFollowerList()
    }else{
      getFollowingList()
    }
  },[title])
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#202020] rounded-lg w-[400px] h-[400px] overflow-y-auto relative">
        <button className="absolute top-2 text-xl right-2" onClick={()=>dispatch(closeFollowList())}><IoClose /></button>
      <p className="text-white text-sm text-center font-semibold py-3 border-b border-gray-700">{title}</p>
      <div className="w-full h-auto pt-3">
      {
        title==="Followers"?
        followerList.map((follower)=>{
          return(
            <div className="py-2 px-2 flex justify-between items-center" key={follower.follower._id}>
              <div className="flex gap-2 items-center">
              <img src={follower.follower.profile} alt="profile" className="w-10 h-10 rounded-full" />
              <div className="text-xs">
              <p>{follower.follower.username}</p>
              <p>{follower.follower.fullname}</p>
              </div>
              </div>
              <button className="bg-[#7B7B7B] h-7 px-5 text-xs rounded-md text-center text-white" onClick={()=>removeFollower(follower.follower._id)}>Remove</button>
            </div>
          )
        }):
        followingList.map((following)=>{
          return(
            <div className="py-2 px-2 flex justify-between items-center" key={following.following._id}>
              <div className="flex gap-2 items-center">
              <img src={following.following.profile} alt="profile" className="w-10 h-10 rounded-full" />
              <div className="text-xs">
              <p>{following.following.username}</p>
              <p>{following.following.fullname}</p>
              </div>
              </div>
              <button className="bg-[#7B7B7B] h-7 px-5 text-xs rounded-md text-center text-white" onClick={()=>removeFollower(following.following._id)} >Remove</button>
            </div>
          )
        })
      }
      </div>
      {/* <button onClick={()=>dispatch(closeFollowList())}>close</button> */}
      </div>
    </div>
  )
}

export default FollowList
