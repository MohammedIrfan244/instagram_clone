import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import GreyButton from "../ui/GreyButton";
import { User, Message } from "../../utilities/interfaces";

function Messages() {
  const { username } = useParams<{ username: string }>();
  const [currUser, setCurrentUser] = useState<User | undefined>(undefined);
  const [message, setMessage] = useState<string>("");
  const [conversation, setConversation] = useState<Message[]>([]);

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

  // Fetch conversation
  useEffect(() => {
    const getConversation = async () => {
      try {
        if (currUser) {
          const response = await axiosInstance.get(`/messages/conversation/${currUser._id}`);
          setConversation(response.data);
        }
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    };

    if (currUser) {
      getConversation();
    }
  }, [currUser]);

  const handleSendMessage = async () => {
    try {
      if (!message.trim()) return; // Do not send empty messages

      await axiosInstance.post('/messages/send', {
        receiverId: currUser?._id,
        content: message,
      });

      setMessage(""); // Clear the input after sending
      // Optionally fetch the updated conversation
      const response = await axiosInstance.get(`/messages/conversation/${currUser?._id}`);
      setConversation(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  return (
    <div className="lg:w-[70%] w-full h-[100vh] flex flex-col">
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

      {/* conversation area */}
      <div className="flex-1 overflow-auto py-10 px-5">
        <div className="space-y-4">
          {conversation.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.sender === currUser?._id ? "justify-start" : "justify-end"}`}
            >
              <div className={`p-3 rounded-md max-w-xs ${msg.sender === currUser?._id ? "bg-blue-500" : "bg-gray-800"}`}>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message input and send button at the bottom */}
      <div className="w-full flex justify-center items-center gap-3 mt-6 px-5 py-4 fixed bottom-0 left-0 bg-white border-t border-gray-200">
        <input
          type="text"
          className="w-full py-2 px-4 bg-black border border-gray-300 rounded-md"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <GreyButton
          text="Send"
          onClick={handleSendMessage}
          loading={false}
          loadingText=""
          styles="py-2 px-4 text-sm rounded-md"
        />
      </div>
    </div>
  );
}

export default Messages;
