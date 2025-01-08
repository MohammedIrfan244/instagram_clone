import { useEffect, useState } from "react"
import axiosInstance from "../../utilities/axiosInstance"
import axiosErrorManager from "../../utilities/axiosErrorManager"
import { useNavigate } from "react-router-dom";


interface ProfileCircProps {
    username: string;
}

function ProfileCirc({ username }: ProfileCircProps): JSX.Element {
    const [profile,setProfile]=useState<string>('')
    const navigate=useNavigate()
        const fetchProfile=async():Promise<void>=>{
            try{
                const response=await axiosInstance.get(`/user/profile_pic/${username}`)
                setProfile(response.data.profile)
                console.log(response.data.profile)
            }catch(error){
                console.log(axiosErrorManager(error))
            }
        }

        useEffect(()=>{
            fetchProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
  return (
    <div className="w-8 h-8 overflow-hidden hover:cursor-pointer rounded-full"onClick={()=>navigate(`/${username}`)} >
      <img src={profile} alt="Profile" />
    </div>
  )
}

export default ProfileCirc
