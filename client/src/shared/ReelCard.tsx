import { IoMdHeart } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
// import { MdDeleteOutline } from "react-icons/md";


interface ReelCardProps {
  media: string;
  id:string;
  likesCount: number;
  commentsCount: number;
  // onDelete: () => void
}

function ReelCard({  media, likesCount, id,commentsCount }: ReelCardProps): JSX.Element {
  const navigate=useNavigate()
  return (
    <div className="w-[130px] h-[200px] lg:w-[300px] lg:h-[500px] overflow-hidden relative group" onClick={()=>navigate(`/feed/post/${id}`)}>
      
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