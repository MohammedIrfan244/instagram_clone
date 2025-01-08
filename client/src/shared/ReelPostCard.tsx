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

interface ReelPostCardProps {
  media: string;
  username: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  id: string;
}

function ReelPostCard({
  media,
  username,
  caption,
  likesCount,
  commentsCount,
  id,
}: ReelPostCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likesCount);
  const [isSaved, setIsSaved] = useState<boolean>(false);
const navigate=useNavigate()
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
  }, [id]);

  return (
    <div className="w-[400px] h-[600px] py-5 items-center flex">
      <div className="w-[350px] relative h-full rounded-md overflow-hidden">
        <video
          src={media}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute bottom-0 left-2 space-y-1 py-2">
          <div className="flex gap-2 items-center">
            <ProfileCirc username={username} />
            <p className="text-xs font-bold">{username}</p>
          </div>
          <p className="text-xs font-bold">{caption}</p>
        </div>
      </div>
      <div className="w-[50px] h-full text-xl flex flex-col items-center justify-end gap-5">
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
        <SlOptions />
      </div>
    </div>
  );
}

export default ReelPostCard;
