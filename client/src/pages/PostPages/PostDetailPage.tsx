import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../utilities/interfaces";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import ProfileCirc from "../../components/ui/ProfileCirc";  
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import { BiSmile } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SlOptions } from "react-icons/sl";
import { closeOptionsPopup, openOptionsPopup } from "../../redux/commonSlice";
import PostOption from "../../popups/PostOption";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";

interface Comment {
  _id: string;
  comment: string;
  user: {
    username: string;
  };
}

function PostDetailPage() {
  const { id } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const { optionsPopup } = useSelector((state: RootState) => state.common);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [option, setOption] = useState<string>("");
  const [commentId, setCommentId] = useState<string>("");
  const [commenter, setCommenter] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted,setIsMuted]=useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement | null>(null); 
  const [commentBox, setCommentBox] = useState<Comment[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/post/get_one_post/${id}`);
      const isLiked = await axiosInstance.get(`/user/post/is_liked/${id}`);
      const isSaved = await axiosInstance.get(`/user/post/is_saved/${id}`);
      setIsLiked(isLiked.data.isLiked);
      setIsSaved(isSaved.data.isSaved);
      setPost(response.data.post);
    } catch (error) {
      console.log(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const percentage =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage || 0);
    }
  };

  const likePost = async () => {
    try {
      const response = await axiosInstance.post(`/user/post/like_post/${id}`);
      setIsLiked(response.data.isLiked);
      fetchData();
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const optionHandle = (opt: string, id: string, user: string) => {
    setOption(opt);
    setCommentId(id);
    setCommenter(user);
    dispatch(openOptionsPopup());
  };

  const savePost = async () => {
    try {
      const response = await axiosInstance.post(`/user/post/save_post/${id}`);
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const getCommnetBox = async () => {
    try {
      const response = await axiosInstance.get(`/user/post/get_comments/${id}`);
      setCommentBox(response.data.comments);
      console.log("comments", response.data.comments);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const deleteComment = async () => {
    try {
      const response = await axiosInstance.delete(`/user/post/delete_comment/${commentId}`);
      console.log(response.data);
      fetchData();
      getCommnetBox();
      dispatch(closeOptionsPopup());
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const deletePost = async () => {
    try {
      const response = await axiosInstance.delete(`/user/post/delete_post/${id}`);
      navigate('/');
      console.log(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const postComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/user/post/comment_post/${id}`, { comment });
      console.log(response.data);
      setComment("");
      fetchData();
      getCommnetBox();
    } catch (error) {
      console.log(axiosErrorManager(error));
      setComment("");
    }
  };

  useEffect(() => {
    fetchData();
    getCommnetBox();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const closeModal = () => {
    navigate(-1);
  };

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="spinner"></span>
      </div>
    );
  }

  return (
    <div className="bg-black bg-opacity-50 h-screen w-screen lg:w-full z-10 top-0 mt-16 lg:mt-0 right-0 flex justify-center items-center absolute">
      <button
        className="absolute top-3 font-bold right-3 text-white"
        onClick={closeModal}
      >
        ✕
      </button>
      <div className="flex flex-col  lg:flex-row lg:max-w-[90%] w-screen h-[600px] lg:w-auto">
        <div className={loading?"h-[600px] w-screen flex justify-center item-center":"flex relative w-auto justify-center lg:min-w-[400px] lg:max-w-[700px] h-full"}>
          {!post.isReel ? (
            <img
              src={post.media}
              alt="post"
              width={'100%'}
              height={"100%"}
              className="h-full object-cover"
            />
          ) : (
            <video
              src={post.media}
              autoPlay
              loop
              muted={isMuted}
              ref={videoRef}
              onTimeUpdate={updateProgress}
              onClick={togglePlayPause}
            ></video>
          )}
          {loading&&<span className="spinner"/>}
          {post.isReel && (
            <>
            <button className="absolute top-3 font-bold right-3 text-white text-3xl" onClick={toggleMute}>{isMuted?<BiVolumeMute/>:<BiVolumeFull/>}</button>
            <div className="absolute bottom-0 w-full h-1 bg-gray-600">
              <div
                className="h-full bg-white"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            </>
          )}
        </div>
        <div className="w-screen h-full pb-24 lg:pb-0 text-white ps-5 text-sm">
          <div className="border-b border-gray-700 gap-3 font-semibold flex justify-between w-full items-center h-[50px]">
            <div className="flex gap-3">
              <ProfileCirc username={post.username} />
              <p>{post.username}</p>
            </div>
            <button onClick={() => optionHandle("post", "", "")}><SlOptions /></button>
          </div>
          <div className="space-y-2 h-[200px] lg:h-[430px] overflow-y-scroll scrollbar-none scrollbar-thumb-black border-b border-gray-600">
            <div className="gap-3 flex items-center h-[50px]">
              <ProfileCirc username={post.username} />
              <p className="font-semibold">{post.username}</p>
              <p>{post.caption}</p>
            </div>
            {commentBox.map((comment) => (
              <div key={comment._id} className="gap-3 flex items-center h-[50px] relative">
                <ProfileCirc username={comment.user.username} />
                <p className="font-semibold">{comment.user.username}</p>
                <p>{comment.comment}</p>
                {comment.user.username === currentUser?.username && (
                  <button
                    onClick={() => optionHandle("comment", comment._id, comment.user.username)}
                    className="absolute right-0 text-sm"
                  >
                    <SlOptions />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="h-[100px] w-full">
            <div className="border-b border-gray-600">
              <div className="flex justify-between h-[50px] text-2xl">
                <div className="flex gap-3">
                  <button onClick={likePost}>
                    {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
                  </button>
                  <button>
                    <IoChatbubbleOutline />
                  </button>
                  <button>
                    <IoPaperPlaneOutline />
                  </button>
                </div>
                <button onClick={savePost}>
                  {isSaved ? <MdBookmark className="text-white" /> : <MdOutlineBookmarkBorder />}
                </button>
              </div>
              <p className="font-semibold">{post.likesCount} Likes</p>
            </div>
            <form onSubmit={(e) => postComment(e)} className="w-full relative flex items-center">
              <BiSmile className="absolute left-0 text-2xl" />
              <input
                placeholder="Add a comment ..."
                type="text"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-black ps-10 h-[50px] focus:outline-none placeholder:text-gray-400 placeholder:text-sm"
              />
              <button type="submit" className="text-sm font-semibold text-gray-400">Post</button>
            </form>
          </div>
        </div>
      </div>
      {optionsPopup && (
        <PostOption
          key={post._id}
          isPost={option === "post"}
          isCurrentUser={option === "post" ? currentUser?.username === post.username : currentUser?.username === commenter}
          onDelete={option === "post" ? deletePost : deleteComment}
        />
      )}
    </div>
  );
}

export default PostDetailPage;
