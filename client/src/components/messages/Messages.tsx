import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import GreyButton from "../ui/GreyButton";
import { Message, User } from "../../utilities/interfaces";

function Messages() {
  const { username } = useParams();
  const [currUser, setCurrentUser] = useState<User>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/message/send`, {
        receiverId: currUser?._id,
        content: message,
      });
      setMessage("");
    } catch (error) {
      console.log(axiosErrorManager(error));
      setMessage("");
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axiosInstance.get(
          import.meta.env.VITE_API_URL + `/message/conversation/${currUser?._id}`
        );
        setMessages(response.data);
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    };
    getMessages();
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/profile_pic/${username}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    };
    getUser();
  }, [username]);


  return (
    <div className="lg:w-[70%] relative w-full h-[100vh] overflow-y-hidden">
      {/* heading */}
      <div className="w-full border-b flex gap-5 items-center ps-5 h-20 border-gray-800">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src={currUser?.profile} alt={currUser?.username} />
        </div>
        <div>
          <p className="text-lg font-semibold">{currUser?.fullname}</p>
          <p className="text-sm font-light">{currUser?.username}</p>
        </div>
      </div>


      <div className="overflow-y-auto h-full" >
      {/* area for profile */}
      <div className="h-auto py-10 flex gap-5 items-center flex-col justify-center w-full">
        <div className="w-28 h-28 rounded-full overflow-hidden">
          <img src={currUser?.profile} alt={currUser?.username} />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">{currUser?.fullname}</p>
          <p className="text-sm font-light">{currUser?.username} . Instagram</p>
        </div>
        <GreyButton
          text={"View profile"}
          onClick={() => {}}
          loading={false}
          loadingText={""}
          styles="py-2 px-4 text-sm rounded-md"
        />
      </div>
      {/* Messages */}
      <div className="flex flex-col gap-4 p-4 mb-40 h-auto">
        {messages?.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === currUser?._id ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender === currUser?._id
                  ? "bg-gray-200 text-black rounded-tl-none"
                  : "bg-blue-500 text-white rounded-tr-none"
              }`}
            >
              <p className="text-sm text-red-600">{msg.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
        </div>

      {/* Message input and send button */}
      <div className="w-full flex justify-center absolute left-0 bottom-0 items-center gap-3 mt-6 px-5 py-4 bg-white border-t border-gray-200">
        <form onSubmit={(e) => sendMessage(e)} className="w-full flex gap-3 items-center">
          <input
            type="text"
            className="w-full py-2 px-4 bg-black border border-gray-300 rounded-md"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
            send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;