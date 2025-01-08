import ProfileCirc from "../components/ui/ProfileCirc";
import { SlOptions } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { MdBookmark } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";

interface HomePostCardProps {
  media: string;
  username: string;
  likesCount: number;
  commentsCount: number;
  caption: string;
  id:string;
  isReel: boolean;
}

function HomePostCard({
  media,
  username,
  likesCount,
  commentsCount,
  caption,
  id,
  isReel,
}: HomePostCardProps): JSX.Element {
  const [isLiked,setIsLiked]=useState<boolean>(false)
  const [likeCount,setLikeCount]=useState<number>(likesCount)
  const [isSaved,setIsSaved]=useState<boolean>(false)
  const navigate=useNavigate()
  const getIsLiked=async()=>{
    try{
      const response=await axiosInstance.get(`/user/post/is_liked/${id}`)
      setIsLiked(response.data.isLiked)
    }catch(error){
      console.log(axiosErrorManager(error))
    }
    }

    const getLikeCount = async () => {
      try {
        const response = await axiosInstance.get(`/user/post/get_like_count/${id}`);
        setLikeCount(response.data.likes);
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    }
const getIsSaved = async()=>{
  try{
    const response=await axiosInstance.get(`/user/post/is_saved/${id}`)
    setIsSaved(response.data.isSaved)
  }catch(error){
    console.log(axiosErrorManager(error))
  }
}

const likePost=async()=>{
  try{
    const response=await axiosInstance.post(`/user/post/like_post/${id}`)
    setIsLiked(response.data.isLiked)
    getLikeCount()
  }catch(error){
    console.log(axiosErrorManager(error))
  } 
  }

  const savePost=async()=>{
    try{
      const response=await axiosInstance.post(`/user/post/save_post/${id}`)
      setIsSaved(response.data.isSaved)
    }catch(error){
      console.log(axiosErrorManager(error))
    } 
    }

useEffect(()=>{
getIsLiked()
getIsSaved()
},[id])

useEffect(()=>{
console.log(isLiked,isSaved)
},[isLiked,isSaved])
  
  return (
    <div className="h-auto text-white border-b border-gray-600 space-y-2 pt-5 w-[500px]">
      <div className="flex justify-between w-full items-center text-sm font-semibold">
        <div className="flex items-center gap-2">
          <ProfileCirc username={username} />
          <p>{username}</p>
        </div>
        <SlOptions />
      </div>
      {isReel ? (
        <video
          src={media}
          autoPlay
          loop
          muted
          className="w-[500px] max-h-[600px] h-full object-cover border border-gray-600"
        ></video>
      ) : (
        <img src={media} alt="Post" className="w-full h-full object-cover border border-gray-600" />
      )}
      <div className="flex justify-between text-2xl">
        <div className="flex gap-3">
          <button onClick={likePost}>
            {isLiked ? (
              <FaHeart className="text-red-600" />
            ) : (
              <FaRegHeart />
            )}
          </button>
          <button onClick={()=>navigate(`/feed/post/${id}`)}>
            <IoChatbubbleOutline />
          </button>
          <button>
            <IoPaperPlaneOutline />
          </button>
        </div>
        <button onClick={savePost}>
          {isSaved ? (
            <MdBookmark className="text-white" />
          ) : (
            <MdOutlineBookmarkBorder />
          )}
        </button>
      </div>
      <div onClick={()=>navigate(`/feed/post/${id}`)}>
      <p className="text-xs text-gray-200">{likeCount} likes</p>
      <p className="text-sm font-semibold">{caption}</p>
      <p className="text-xs text-gray-300">View all {commentsCount} comments</p>
      <p className="text-xs text-gray-300 pb-5">Add a comment ...</p>
      </div>
    </div>
  );
}

export default HomePostCard;
