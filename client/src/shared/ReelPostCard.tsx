import ProfileCirc from "../components/ui/ProfileCirc"
import { SlOptions } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarkBorder } from "react-icons/md";


interface ReelPostCardProps{
    media:string,
    username:string,
    caption:string,
    likesCount:number,
    commentsCount:number
}

function ReelPostCard({media,username,caption,likesCount,commentsCount}:ReelPostCardProps) {
  return (
    <div className="w-[400px] h-[600px] py-5 items-center flex">
      <div className="w-[350px] relative h-full rounded-md overflow-hidden">
        <video src={media} autoPlay controls loop className="w-full h-full object-cover"></video>
      <div className="absolute bottom-0 left-2 space-y-1 py-2">
      <div className="flex gap-2 items-center">
      <ProfileCirc username={username}/>
      <p className="text-xs font-bold">{username}</p>
      </div>
      <p className="text-xs font-bold">{caption}</p>
      </div>
      </div>    
      <div className="w-[50px] h-full text-xl flex flex-col items-center justify-end gap-5">
        <div className="flex flex-col items-center gap-1">
          <button><FaRegHeart/></button>
        <p className="text-sm">{likesCount}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button><IoChatbubbleOutline/></button>
        <p className="text-sm">{commentsCount}</p>
        </div>
        <IoPaperPlaneOutline/>
        <MdOutlineBookmarkBorder/>
        <SlOptions/>
      </div>
    </div>
  )
}

export default ReelPostCard
