import { IoMdHeart } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";


interface ReelCardProps {
  media: string;
  likesCount: number;
  commentsCount: number;
}

function ReelCard({  media, likesCount, commentsCount }: ReelCardProps): JSX.Element {
  return (
    <div className="w-[240px] h-[360px] overflow-hidden relative group">
      
        <video src={media} className="w-full h-full object-cover"></video>
      <div className="absolute top-0 right-0 w-full h-full z-10 bg-black bg-opacity-50 hidden group-hover:flex justify-center items-center">
      <div className="flex items-center gap-3 ">
      <p className="flex items-center font-semibold"><IoMdHeart className="text-2xl"/> {likesCount}</p>
      <p className="flex items-center font-semibold"> <BiSolidMessageRounded className="text-2xl"/> {commentsCount}</p>
      </div>
      </div>
    </div>
  );
}

export default ReelCard;