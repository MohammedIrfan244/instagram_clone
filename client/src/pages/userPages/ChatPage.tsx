import Chats from "../../components/messages/Chats"
import InboxIcon from "../../components/messages/InboxIcon"


function ChatPage() {
  return (
    <div className="flex ps-0 lg:ps-72 ">
      <Chats />
      <InboxIcon />
    </div>
  )
}

export default ChatPage
