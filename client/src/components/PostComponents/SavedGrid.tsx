import { useEffect, useState } from "react";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { Post } from "../../utilities/interfaces";
import PostCard from "../../shared/PostCard";


interface SavedPost{
  post:Post
}
function SavedGrid() {

    const [posts,setPosts]=useState<SavedPost[]>([])

    const fetchData=async()=>{
        try{
            const url = "/user/post/saved_posts"
            const response=await axiosInstance.get(url)
            setPosts(response.data.posts)
          }catch(error){
            console.log(axiosErrorManager(error))
          }finally{
          console.log(posts)
        }
    }
    useEffect(()=>{
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
      {
        posts.map((post,index)=><PostCard key={index} onDelete={()=>{}} ownPost={false}  isReel={post.post.isReel} id={post.post._id} media={post.post.media} likesCount={post.post.likesCount} commentsCount={post.post.commentsCount} />)
      }
    </div>
  )
}

export default SavedGrid

