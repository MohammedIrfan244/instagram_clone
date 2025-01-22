import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import GreyButton from "../ui/GreyButton";
import { Message, User } from "../../utilities/interfaces";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
import { socket } from "../../hooks/useConnectSocket";



function Messages() {
  const { username } = useParams();
  const navigate = useNavigate()
  const [currUser, setCurrUser] = useState<User>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && shouldAutoScroll) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (!messagesContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setShouldAutoScroll(isNearBottom);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const response = await axiosInstance.post(`/message/send`, {
        receiverId: currUser?._id,
        content: message,
      });

      // Use the returned message from the server which will have the correct timestamp
      const newMessage = response.data.newMessage;
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      setShouldAutoScroll(true);
    } catch (error) {
      console.log(axiosErrorManager(error));
      setMessage("");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("receiveMessage", (data: Message) => {
      setMessages(prev => [...prev, data]);
      setShouldAutoScroll(true);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [username]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axiosInstance.get(
          import.meta.env.VITE_API_URL + `/message/conversation/${currUser?._id}`
        );
        setMessages(response.data);
        setShouldAutoScroll(true);
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    };

    if (currUser?._id) {
      getMessages();
    }
  }, [currUser?._id]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axiosInstance.get(`/user/profile_pic/${username}`);
        setCurrUser(response.data);
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    };
    getUser();
  }, [username]);


  return (
    <div className="lg:w-[70%] relative w-full h-fill py-10 mb-16 sm:mb-0 sm:py-0 overflow-y-hidden">
      {/* Header remains the same */}
      <div className="w-full border-b flex gap-5 items-center ps-5 h-20 border-gray-800">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src={currUser?.profile} alt={currUser?.username} />
        </div>
        <div>
          <p className="text-lg font-semibold">{currUser?.fullname}</p>
          <p className="text-sm font-light">{currUser?.username}</p>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="overflow-y-auto h-[calc(100vh-160px)] scrollbar scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >

        {/* Profile section remains the same */}
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
            onClick={() => navigate(`/${currUser?.username}`)}
            loading={false}
            loadingText={""}
            styles="py-2 px-4 text-sm rounded-md"
          />
        </div>

        {/* Messages section */}
        <div className="flex flex-col gap-4 p-4 mb-4">
          {messages?.map((msg, index) => {
            const showTimestamp =
              index === 0 ||
              (new Date(msg.createdAt).getTime() -
                new Date(messages[index - 1]?.createdAt).getTime()) >
              3600000; 

            return (
              <div key={index} className="flex flex-col">
                {showTimestamp && (
                  <span className="text-center text-xs text-gray-500 my-2">
                    {new Date(msg.createdAt).toLocaleString([], {
                      weekday: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
                <div
                  className={`flex ${msg.sender === currUser?._id ? "justify-start" : "justify-end"
                    }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${msg.sender === currUser?._id
                        ? "bg-[#262626] text-white rounded-tl-none"
                        : "bg-blue-500 text-white  rounded-tr-none"
                      }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Message input*/}
      <div className="w-full flex justify-center absolute left-0 bottom-0 items-center gap-3 p-3"> 
        <form onSubmit={sendMessage} className="w-full flex gap-3 items-center">
          <input
            type="text"
            className="w-full py-2 px-4 bg-black border border-gray-600 rounded-3xl"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-10 text-blue-500 text-sm font-semibold"
            disabled={!message.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Messages;