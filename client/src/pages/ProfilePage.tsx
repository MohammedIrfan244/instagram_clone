import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserDetail } from "../utilities/interfaces"


function  ProfilePage(): JSX.Element {
    const {username}=useParams<string>()
    const [currUser,setCurrUser]=useState<UserDetail|null>(null)
    const getUser=async (username:string)=>{
      try{
        const response=await axios.get('http://localhost:3000/api/user/getOneUser/'+username,{withCredentials:true})
        setCurrUser(response.data.user)
      }catch(error){
        if(axios.isAxiosError(error)){
          console.log(error.response?.data)
        }
        setCurrUser(null)
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
