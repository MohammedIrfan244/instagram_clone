import ProfileCirc from "../components/ui/ProfileCirc";
import { SlOptions } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarkBorder } from "react-icons/md";

interface HomePostCardProps {
    media: string;
    username: string;
    likesCount: number;
    commentsCount: number;
    caption: string;
    isReel: boolean
}

function HomePostCard({media,username,likesCount,commentsCount,caption,isReel}:HomePostCardProps): JSX.Element {
  return (
    <div className="h-auto text-white border-b border-gray-600 space-y-2 pt-5 w-[500px]">
        <div className="flex justify-between w-full items-center text-sm font-semibold">
        <div className="flex items-center gap-2">
        <ProfileCirc username={username}/>
        <p>{username}</p>
        </div>
        <SlOptions />
        </div>
      {isReel ? (
        <video src={media} autoPlay loop controls className="w-full h-full object-contain"></video>
      ) : (
        <img src={media} alt="Post" className="w-full h-full object-contain" />
      )}
      <div className="flex justify-between text-2xl">
        <div className="flex gap-3">
            <button><FaRegHeart/></button>
            <button><IoChatbubbleOutline/></button>
            <button><IoPaperPlaneOutline/></button>
        </div>
        <button><MdOutlineBookmarkBorder/></button>
      </div>
      {<p className="text-xs text-gray-200">{likesCount} likes</p>}
      <p className="text-sm font-semibold">{caption}</p>
       <p className="text-xs text-gray-300">View all {commentsCount} comments</p>
       <p className="text-xs text-gray-300 pb-5">Add a comment ...</p>
    </div>
  )
}

export default HomePostCard
