import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import PostCard from "../../shared/PostCard";
import { Post } from "../../utilities/interfaces";

interface PostGridProps {
  isCurrUser: boolean;
  username: string;
}

function PostGrid({ isCurrUser, username }: PostGridProps): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPosts = async (): Promise<void> => {
    try {
      const url = isCurrUser
        ? `/user/post/get_curruser_posts`
        : `/user/post/get_user_posts/${username}`;
      setLoading(true);
      const response = await axiosInstance.get(url);
      setPosts(response.data?.posts || []);
    } catch (error) {
      console.error(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && (
        <div className="w-full h-[300px] flex items-center justify-center">
          <span className="spinner"></span>
        </div>
      )}
    <div className="grid-cols-3 grid w-screen">
      {!loading && posts.length === 0 && <p>No posts available</p>}
      {posts.map((post, index) => (
        <PostCard
        key={index}
        id={post._id}
        isReel={post.isReel}
        media={post.media}
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        />
      ))}
      </div>
    </div>
  );
}

export default PostGrid;
