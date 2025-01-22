import { useSelector } from "react-redux"
import { PiNotePencilBold } from "react-icons/pi";
import { RootState } from "../../redux/store"
import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import { User } from "../../utilities/interfaces";
import { useNavigate } from "react-router-dom";

function Chats({visible}:{visible:boolean}) {
    const {currentUser}= useSelector((state:RootState)=>state.currentUser)
    const [conversation, setConversation] = useState<User[]>([]);
const navigate=useNavigate()
    useEffect(()=>{
      const getConversation=async():Promise<void>=>{
        try{
          const response=await axiosInstance.get('/message/conversations')
          setConversation(response.data.users)
          console.log(response.data)
        }catch(error){
          console.log(axiosErrorManager(error))
        }
      }
      getConversation()
    },[])
  return (
    <div className={`lg:w-[30%] w-full px-5 h-[100vh] lg:border-r border-0 border-gray-800 ${visible?'block':'hidden sm:block'}`}>
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
        <div className="flex flex-col gap-3 pt-3">
          {conversation.map((conversation, index) => (
            <div onClick={()=>navigate(`/direct/t/${conversation.username}`)} key={index}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden">
                    <img src={conversation.profile} alt={conversation.username} />
                  </div>
                  <p>{conversation.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chats
