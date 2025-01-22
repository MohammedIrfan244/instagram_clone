import Chats from "../../components/messages/Chats"
import Messages from "../../components/messages/Messages"


function DmPage() {
  return (
    <div className="flex ps-0 lg:ps-72">
      <Chats visible={false} />
      <Messages />
    </div>
  )
}

export default DmPage
