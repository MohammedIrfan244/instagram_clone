import { useEffect, useState } from "react";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { Post } from "../../utilities/interfaces";
import HomePostCard from "../../shared/HomePostCard";



function HomeGrid(): JSX.Element {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading,setLoading]=useState<boolean>(false)

    const fetchHomeFeed=async():Promise<void>=>{
      try{
        setLoading(true)
        const response=await axiosInstance.get('/user/post/home_page')
        setPosts(response.data.posts)
        console.log(response.data)
      }catch(error){
        console.log(axiosErrorManager(error))
      }finally{
        setLoading(false)
      }
    }
    useEffect(()=>{
      fetchHomeFeed()
    },[])
  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && posts.length===0 && <p>No posts available</p>}
      {posts.map((post,index)=><HomePostCard key={index} media={post.media} username={post.username} likesCount={post.likesCount} commentsCount={post.commentsCount} caption={post.caption} isReel={post.isReel}/>)}
    </div>
  )
}

export default HomeGrid
