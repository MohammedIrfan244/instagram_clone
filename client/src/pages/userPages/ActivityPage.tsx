import { FaRegHeart } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { HiOutlineBookmark } from "react-icons/hi2";
import { IoMdGrid } from "react-icons/io";
import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import ActivityCard from "../../shared/ActivityCard";

interface Post {
  _id: string;
  post: {
    _id: string;
    caption: string;
    media: string;
    username: string;
    isReel: boolean;
  };
}

interface CurrPost {
  _id: string;
  isReel: boolean;
  caption: string;
  media: string;
  username: string
}

function ActivityPage(): JSX.Element {

  const [savedPost, setSavedPost] = useState<Post[]>([]);
  const [commentedPost, setCommentedPost] = useState<Post[]>([]);
  const [likedPost, setLikedPost] = useState<Post[]>([]);
  const [userPost, setUserPost] = useState<CurrPost[]>([]);
  const [userReel, setUserReel] = useState<CurrPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const getPosts = async (): Promise<void> => {
      try {
        setLoading(true)
        const resSaved = await axiosInstance.get(`/user/post/saved_posts`);
        const resCommented = await axiosInstance.get(`/user/post/commented_posts`);
        const resLiked = await axiosInstance.get(`/user/post/liked_posts`);
        const resPost = await axiosInstance.get(`/user/post/get_curruser_posts`);
        const resReel = await axiosInstance.get(`/user/post/get_curruser_reels`);
        setSavedPost(resSaved.data.posts);
        setCommentedPost(resCommented.data.posts);
        setLikedPost(resLiked.data.posts);
        setUserPost(resPost.data.posts);
        setUserReel(resReel.data.reels);
      } catch (error) {
        console.log(axiosErrorManager(error))
      } finally {
        setLoading(false)
      }
    }
    getPosts()
  }, [])
  return (
    <div className="ps-3 lg:ps-0 flex flex-col items-center min-h-screen justify-center pt-5 w-screen lg:w-full">
      {loading ? <span className="spinner" /> :
        (<div className="lg:w-[500px] w-screen space-y-10">
          <p className="font-semibold text-lg mb-5">Your Activity</p>
          <div className="space-y-5 font-semibold">
            <p className=" font-extralight">Your interactions</p>
            <button className="flex items-center gap-3"><HiOutlineBookmark className="text-xl" /> Saved</button>
            {savedPost.length > 0 && savedPost.map((p, i) => <ActivityCard key={p._id + String(i)} caption={p.post.caption} media={p.post.media} username={p.post.username} isReel={p.post.isReel} _id={p.post._id} />)}
            <button className="flex items-center gap-3"><FaRegHeart className="text-xl" /> Liked</button>
            {likedPost.length > 0 && likedPost.map((p, i) => <ActivityCard key={p._id + String(i)} caption={p.post.caption} media={p.post.media} username={p.post.username} isReel={p.post.isReel} _id={p.post._id} />)}
            <button className="flex items-center gap-3"><IoChatbubbleOutline className="text-xl" />Commented</button>
            {commentedPost.length > 0 && commentedPost.map((p, i) => <ActivityCard key={p._id + String(i)} caption={p.post?.caption} media={p.post.media} username={p.post.username} isReel={p.post.isReel} _id={p.post._id} />)}
          </div>
          <div className="space-y-5 font-semibold">
            <p className="font-extralight">Your shared content</p>
            <button className="flex items-center gap-3"><IoMdGrid className="text-xl" />Posts</button>
            {userPost.length > 0 && userPost.map((p, i) => <ActivityCard key={p._id + String(i)} caption={p.caption} media={p.media} username={p.username} isReel={p.isReel} _id={p._id} />)}
            <button className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
                <path
                  d="M 15 4 C 8.9365932 4 4 8.9365932 4 15 L 4 35 C 4 41.063407 8.9365932 46 15 46 L 35 46 C 41.063407 46 46 41.063407 46 35 L 46 15 C 46 8.9365932 41.063407 4 35 4 L 15 4 z M 16.740234 6 L 27.425781 6 L 33.259766 16 L 22.574219 16 L 16.740234 6 z M 29.740234 6 L 35 6 C 39.982593 6 44 10.017407 44 15 L 44 16 L 35.574219 16 L 29.740234 6 z M 14.486328 6.1035156 L 20.259766 16 L 6 16 L 6 15 C 6 10.199833 9.7581921 6.3829803 14.486328 6.1035156 z M 6 18 L 44 18 L 44 35 C 44 39.982593 39.982593 44 35 44 L 15 44 C 10.017407 44 6 39.982593 6 35 L 6 18 z M 21.978516 23.013672 C 20.435152 23.049868 19 24.269284 19 25.957031 L 19 35.041016 C 19 37.291345 21.552344 38.713255 23.509766 37.597656 L 31.498047 33.056641 C 33.442844 31.951609 33.442844 29.044485 31.498047 27.939453 L 23.509766 23.398438 L 23.507812 23.398438 C 23.018445 23.120603 22.49297 23.001607 21.978516 23.013672 z M 21.982422 24.986328 C 22.158626 24.988232 22.342399 25.035052 22.521484 25.136719 L 30.511719 29.677734 C 31.220922 30.080703 31.220922 30.915391 30.511719 31.318359 L 22.519531 35.859375 C 21.802953 36.267773 21 35.808686 21 35.041016 L 21 25.957031 C 21 25.573196 21.201402 25.267385 21.492188 25.107422 C 21.63758 25.02744 21.806217 24.984424 21.982422 24.986328 z"
                  fill="white"
                  stroke="white"
                  strokeWidth="1"
                ></path>
              </svg>
              Reels</button>
            {userReel.length > 0 && userReel.map((p, i) => <ActivityCard key={p._id + String(i)} caption={p.caption} media={p.media} username={p.username} isReel={p.isReel} _id={p._id} />)}
          </div>
        </div>)}
    </div>
  )
}

export default ActivityPage
