import { useEffect, useState } from "react";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import ReelCard from "../../shared/ReelCard";

interface Reel{
    media: string;
    likesCount: number;
    commentsCount: number;
}
interface ReelsProp {
    isCurrUser: boolean;
    username: string;
  }

function ReelGrid({isCurrUser,username}:ReelsProp) {
    const [reels,setReels]=useState<Reel[]>([])

    const fetchData=async()=>{
        try{
            const url = isCurrUser
        ? `/user/post/get_curruser_reels`
        : `/user/post/get_user_reels/${username}`;
            const response=await axiosInstance.get(url)
            console.log(response.data.reels)
            setReels(response.data.reels)
            console.log(reels)
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
        reels.map((reel,index)=><ReelCard key={index} media={reel.media} commentsCount={reel.commentsCount} likesCount={reel.likesCount}/>)
      }
    </div>
  )
}

export default ReelGrid
