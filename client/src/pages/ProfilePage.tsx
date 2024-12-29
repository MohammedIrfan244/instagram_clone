import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserDetail } from "../utilities/interfaces"
import axiosErrorManager from "../utilities/axiosErrorManager"
import axiosInstance from "../utilities/axiosInstance"


function  ProfilePage(): JSX.Element {
    const {username}=useParams<string>()
    const [currUser,setCurrUser]=useState<UserDetail|null>(null)
    const getUser=async (username:string)=>{
      try {
        axiosInstance.get(`/user/get_one_user/${username}`).then((res)=>{
          setCurrUser(res.data.user)
          console.log(res.data)
        })
      } catch (error) {
        console.log(axiosErrorManager(error))
      }
      }
    useEffect(()=>{
      if(username){
        getUser(username)
      }
    },[])
  return (
    <div className="flex flex-col justify-center h-auto mt-5 ps-[250px] items-center">
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden hover:cursor-pointer">
      <img src={currUser?.profile} alt="profile" />
      </div>
      <p>{currUser?.username}</p>
      <button>Edit Profile</button>
      <button>View Archive</button>
      <button>Settings</button>
      <p>Posts</p>
      <p>Followers</p>
      <p>Following</p>
      <p>{currUser?.fullname}</p>
      <p>{currUser?.bio}</p>
    </div>
  )
}

export default ProfilePage
