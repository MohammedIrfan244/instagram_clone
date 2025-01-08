import { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MdDeleteOutline } from "react-icons/md";

interface Comment {
  _id: string;
  comment: string;
  user:{
    username:string
  }
}
function PostDetailPage() {
  const { id } = useParams();
  const {currentUser}=useSelector((state:RootState)=>state.currentUser)
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [comment,setComment]= useState<string>("")
  const [commentBox,setCommentBox]= useState<Comment[]>([])

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/post/get_one_post/${id}`);
      const isLiked= await axiosInstance.get(`/user/post/is_liked/${id}`)
      const isSaved= await axiosInstance.get(`/user/post/is_saved/${id}`)
      setIsLiked(isLiked.data.isLiked)
      setIsSaved(isSaved.data.isSaved)
      setPost(response.data.post);
    } catch (error) {
      console.log(axiosErrorManager(error));
    } finally {
      setLoading(false);
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
      console.log("comments",response.data.comments);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const deleteComment = async (id:string) => {
    try {
      const response = await axiosInstance.delete(`/user/post/delete_comment/${id}`);
      console.log(response.data);
      fetchData();
      getCommnetBox();
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const postComment = async () => {
    try {
      const response = await axiosInstance.post(`/user/post/comment_post/${id}`,{comment});
      console.log(response.data)
      setComment("")
      fetchData();
      getCommnetBox();
    } catch (error) {
      console.log(axiosErrorManager(error));
      setComment("")
    }
  };

  useEffect(() => {
    fetchData();
    getCommnetBox();
  }, [id]);

  const closeModal = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="bg-black bg-opacity-50 h-screen w-full z-10 top-0 right-0 flex justify-center items-center absolute">
      <button
        className="absolute top-3 font-bold right-3 text-gray-600"
        onClick={closeModal}
      >
        ✕
      </button>
      <div className="flex h-[600px] w-auto">
        <div className="flex w-auto h-full">
          {!post.isReel ? (
            <img
              src={post.media}
              alt="post"
              width={"100%"}
              className="h-full object-cover"
            />
          ) : (
            <video
              src={post.media}
              width={"100%"}
              className="h-[600px]"
              autoPlay
              loop
            ></video>
          )}
        </div>
        <div className="w-[500px] h-full text-white ps-5 text-sm">
          <div className="border-b border-gray-700 gap-3 font-semibold flex items-center h-[50px]">
            <ProfileCirc username={post.username} />
            <p>{post.username}</p>
          </div>
          <div className="space-y-2 h-[430px] border-b border-gray-600">
            <div className="gap-3 flex items-center h-[50px]">
              <ProfileCirc username={post.username} />
              <p className="font-semibold">{post.username}</p>
              <p>{post.caption}</p>
            </div>
            {
  commentBox.map((comment) => {
    return (
      <div key={comment.comment} className="gap-3 flex items-center h-[50px] relative">
        <ProfileCirc username={comment.user.username} />
        <p className="font-semibold">{comment.user.username}</p>
        <p>{comment.comment}</p>
        {comment.user.username === currentUser?.username && (
          <button
            onClick={() => deleteComment(comment._id)}
            className="absolute right-0 text-red-500 text-sm"
          >
            <MdDeleteOutline />
          </button>
        )}
      </div>
    );
  })
}

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
            <div className="w-full relative flex items-center">
              <BiSmile className="absolute left-0 text-2xl" />
              <input
                placeholder="Add a comment ..."
                type="text"
                name="comment"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                className="w-full bg-black ps-10 h-[50px] focus:outline-none placeholder:text-gray-400 placeholder:text-sm"
              />
              <button onClick={postComment} className="text-sm font-semibold text-gray-400">Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetailPage;
