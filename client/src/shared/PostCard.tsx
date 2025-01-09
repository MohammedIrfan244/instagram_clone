import { IoMdHeart } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
// import { MdDeleteOutline } from "react-icons/md";

interface PostCardProps {
  // onDelete: () => void;
  // ownPost: boolean;
  isReel: boolean;
  id: string;
  media: string;
  likesCount: number;
  commentsCount: number;
}

function PostCard({ isReel, media,  id, likesCount, commentsCount }: PostCardProps): JSX.Element {
  const navigate = useNavigate();

  // const handleDeleteClick = (event: React.MouseEvent) => {
  //   event.stopPropagation(); 
  //   onDelete();
  // };

  return (
    <div
      className="w-[300px] h-[300px] overflow-hidden relative group"
      onClick={() => navigate(`/feed/post/${id}`)}
    >
      {isReel ? (
        <video src={media} className="w-full h-full object-cover"></video>
      ) : (
        <img src={media} alt="Post" className="w-full h-full object-cover" />
      )}
      <div className="absolute top-0 right-0 w-full h-full z-10 bg-black bg-opacity-50 hidden group-hover:flex justify-center items-center">
        {/* {ownPost && (
          <button
            onClick={handleDeleteClick}
            className="text-red-500 absolute top-2 right-2 z-10"
          >
            <MdDeleteOutline />
          </button>
        )} */}
        <div className="flex items-center gap-3">
          <p className="flex items-center font-semibold">
            <IoMdHeart className="text-2xl" /> {likesCount}
          </p>
          <p className="flex items-center font-semibold">
            <BiSolidMessageRounded className="text-2xl" /> {commentsCount}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
