import { useEffect, useState } from "react";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import ReelCard from "../../shared/ReelCard";
import { Post } from "../../utilities/interfaces";

interface ReelsProp {
    isCurrUser: boolean;
    username: string;
  }

function ReelGrid({isCurrUser,username}:ReelsProp) {
    const [reels,setReels]=useState<Post[]>([])

    const fetchData=async()=>{
        try{
            const url = isCurrUser
        ? `/user/post/get_curruser_reels`
        : `/user/post/get_user_reels/${username}`;
            const response=await axiosInstance.get(url)
            setReels(response.data.reels)
        }catch(error){
            console.log(axiosErrorManager(error))
        }
    }
    const deletePost=async(id:string)=>{
        try{
            const response=await axiosInstance.delete(`/user/post/delete_post/${id}`)
            fetchData()
            console.log(response.data)
        }catch(error){
            console.log(axiosErrorManager(error))
        }
    }
    useEffect(()=>{
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
      {
        reels.map((reel,index)=><ReelCard key={index} id={reel._id} onDelete={()=>deletePost(reel._id)} media={reel.media} commentsCount={reel.commentsCount} likesCount={reel.likesCount}/>)
      }
    </div>
  )
}

export default ReelGrid
