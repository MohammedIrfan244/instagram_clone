import { useState, useEffect } from "react";
import ProfileCirc from "../components/ui/ProfileCirc";
import { SlOptions } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import axiosInstance from "../utilities/axiosInstance";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useNavigate } from "react-router-dom";
// import PostOption from "../popups/PostOption"; 
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { openOptionsPopup } from "../redux/commonSlice";

interface ReelPostCardProps {
  media: string;
  username: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  onDelete: () => void;
  id: string;
}

function ReelPostCard({
  media,
  username,
  caption,
  // onDelete,
  likesCount,
  commentsCount,
  id,
}: ReelPostCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likesCount);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  // const {optionsPopup}=useSelector((state:RootState)=>state.common)
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {currentUser}=useSelector((state:RootState)=>state.currentUser)

  const getIsLiked = async () => {
    try {
      const response = await axiosInstance.get(`/user/post/is_liked/${id}`);
      setIsLiked(response.data.isLiked);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const getIsSaved = async () => {
    try {
      const response = await axiosInstance.get(`/user/post/is_saved/${id}`);
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const getLikeCount = async () => {
    try {
      const response = await axiosInstance.get(`/user/post/get_like_count/${id}`);
      setLikeCount(response.data.likes);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };
useEffect(()=>{
console.log(username,currentUser)
},[currentUser,username])
  const likePost = async () => {
    try {
      const response = await axiosInstance.post(`/user/post/like_post/${id}`);
      setIsLiked(response.data.isLiked);
      getLikeCount();
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const savePost = async () => {
    try {
      const response = await axiosInstance.post(`/user/post/save_post/${id}`);
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  useEffect(() => {
    getIsLiked();
    getIsSaved();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="lg:w-[400px] w-screen h-screen justify-center relative mb-20 lg:mb-0 lg:h-[600px] py-5 items-center flex">
      <div className="lg:w-[350px] w-screen lg:h-full rounded-md overflow-hidden">
        <video
          src={media}
          autoPlay
          loop
          muted
          className="w-full h-full object-contain"
        ></video>
        <div className="absolute bottom-0 left-2 space-y-1 py-2">
          <div className="flex gap-2 items-center">
            <ProfileCirc username={username} />
            <p className="text-xs font-bold">{username}</p>
          </div>
          <p className="text-xs font-bold">{caption}</p>
        </div>
      </div>
      <div className="w-[50px] absolute right-0 h-full text-xl flex flex-col items-center justify-end gap-5">
        <div className="flex flex-col items-center gap-1">
          <button onClick={likePost}>
            {isLiked ? (
              <FaHeart className="text-red-600" />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <p className="text-sm">{likeCount}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => navigate(`/feed/post/${id}`)}>
            <IoChatbubbleOutline />
          </button>
          <p className="text-sm">{commentsCount}</p>
        </div>
        <IoPaperPlaneOutline />
        <button onClick={savePost}>
          {isSaved ? <MdBookmark className="text-white" /> : <MdOutlineBookmarkBorder />}
        </button>
        <button onClick={() =>dispatch(openOptionsPopup()) }>
          <SlOptions />
        </button>
      </div>
      {/* {optionsPopup && (
        <PostOption
          onDelete={onDelete}
          username={username}
          currentUser={currentUser?currentUser.username:""}
          isCurrentUser={currentUser?.username === username}
          isPost={true}
        />
      )} */}
    </div>
  );
}

export default ReelPostCard;
