import BlueButton from "../ui/BlueButton"
import { LiaFacebookMessenger } from "react-icons/lia";


function InboxIcon() {
    return (
        <div className="items-center justify-center hidden lg:w-[70%] lg:flex h-[100vh]">
            <div className=" flex flex-col gap-3 items-center">
                <div className="flex items-center justify-center h-28 w-28 rounded-full border-2">
                <LiaFacebookMessenger className="text-6xl" />
                </div>
                <h1 className="text-xl font-semibold">Your messages</h1>
                <p className="text-gray-400 text-sm">Send a message to start a chat.</p>
                <BlueButton styles="px-4 py-2 text-sm font-semibold" loading={false} onClick={() => {}} text="Send message" />
            </div>
        </div>
    )
}

export default InboxIcon
