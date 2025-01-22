import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axiosInstance from "../../utilities/axiosInstance"
import axiosErrorManager from "../../utilities/axiosErrorManager"
import GreyButton from "../ui/GreyButton"


interface UserDetail {
  profile: string;
  fullname: string;
  username: string;
}

function Messages() {
  const { username } = useParams()
  const [currUser, setCurrentUser] = useState<UserDetail>()
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/profile_pic/${username}`)
        setCurrentUser(response.data);
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    }
    getUser()
  }, [username])
  return (
    <div className="lg:w-[70%] w-full h-[100vh]">
      {/* heading */}
      <div className="w-full border-b flex gap-5 items-center ps-5  h-20 border-gray-800">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src={currUser?.profile} alt={currUser?.username} />
        </div>
        <div>
          <p className="text-lg font-semibold">{currUser?.fullname}</p>
          <p className="text-sm font-light">{currUser?.username}</p>
        </div>
      </div>
      {/* area for profile */}
      <div className="h-auto py-10 flex gap-5 items-center flex-col justify-center w-full">
        <div className="w-28 h-28 rounded-full overflow-hidden">
          <img src={currUser?.profile} alt={currUser?.username} />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">{currUser?.fullname}</p>
          <p className="text-sm font-light">{currUser?.username} . Instagram</p>
        </div>
        <GreyButton text={"View profile"} onClick={()=>{}} loading={false} loadingText={""}  styles="py-2 px-4 text-sm rounded-md" />
      </div>
    </div>
  )
}

export default Messages
