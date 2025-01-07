import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import PostCard from "../../shared/PostCard";

interface PostGridProps {
  isCurrUser: boolean;
  username: string;
}
interface Post {
  isReel: boolean;
  media: string;
  likesCount: number;
  commentsCount: number;
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
      console.log(response.data)
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {loading && <p>Loading...</p>}
      {!loading && posts.length === 0 && <p>No posts available</p>}
      {posts.map((post, index) => (
        <PostCard
          key={index}
          isReel={post.isReel}
          media={post.media}
          likesCount={post.likesCount}
          commentsCount={post.commentsCount}
        />
      ))}
    </div>
  );
}

export default PostGrid;
