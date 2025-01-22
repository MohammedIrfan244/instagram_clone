import { useSelector } from "react-redux"
import { PiNotePencilBold } from "react-icons/pi";
import { RootState } from "../../redux/store"
import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";


function Chats() {
    const {currentUser}= useSelector((state:RootState)=>state.currentUser)
    const [conversation, setConversation] = useState([]);

    useEffect(()=>{
      const getConversation=async():Promise<void>=>{
        try{
          const response=await axiosInstance.get('/message/conversations')
          setConversation(response.data.conversations)
          console.log(response.data)
        }catch(error){
          console.log(axiosErrorManager(error))
        }
      }
      getConversation()
    },[])
  return (
    <div className="lg:w-[30%] w-full px-5 h-[100vh] lg:border-r border-0 border-gray-800">
        {/* Username and new chat icon */}
      <div className="flex h-20 items-end justify-between">
        <h1 className="text-xl font-bold">{currentUser?.username}</h1>
        <button className="text-3xl"><PiNotePencilBold /></button>
      </div>
      {/* Current User */}
      <div className="h-40 flex items-center justify-start">
      <div className="flex items-center justify-center w-20 h-20 rounded-full overflow-hidden   ">
        <img src={currentUser?.profile} alt={currentUser?.username} />
      </div>
      </div>
      {/* Messages */}
      <div>
        <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Messages</h1>
        {/* <p>Requests</p> */}
        </div>
      </div>
    </div>
  )
}

export default Chats
