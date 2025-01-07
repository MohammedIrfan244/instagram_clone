import { IoMdHeart } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";


interface PostCardProps {
  isReel: boolean;
  media: string;
  likesCount: number;
  commentsCount: number;
}

function PostCard({ isReel, media, likesCount, commentsCount }: PostCardProps): JSX.Element {
  return (
    <div className="w-[300px] h-[300px] overflow-hidden relative group">
      {isReel ? (
        <video src={media} className="w-full h-full object-cover"></video>
      ) : (
        <img src={media} alt="Post" className="w-full h-full object-cover" />
      )}
      <div className="absolute top-0 right-0 w-full h-full z-10 bg-black bg-opacity-50 hidden group-hover:flex justify-center items-center">
      <div className="flex items-center gap-3 ">
      <p className="flex items-center font-semibold"><IoMdHeart className="text-2xl"/> {likesCount}</p>
      <p className="flex items-center font-semibold"> <BiSolidMessageRounded className="text-2xl"/> {commentsCount}</p>
      </div>
      </div>
    </div>
  );
}

export default PostCard;
