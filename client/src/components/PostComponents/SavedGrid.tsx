import { useEffect, useState } from "react";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { Post } from "../../utilities/interfaces";
import PostCard from "../../shared/PostCard";

interface SavedPost {
  post: Post;
}

function SavedGrid() {
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = "/user/post/saved_posts";
      const response = await axiosInstance.get(url);
      setPosts(response.data.posts || []);
    } catch (error) {
      console.log(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    {loading && (
      <div className="w-full h-[300px] flex items-center justify-center">
        <span className="spinner"></span>
      </div>
    )}
  <div className="grid-cols-3 gap-1 grid w-screen lg:w-auto">
    {!loading && posts.length === 0 && <p>No posts available</p>}
    {posts.map((post, index) => (
      <PostCard
      key={index}
      id={post.post._id}
      isReel={post.post.isReel}
      media={post.post.media}
      likesCount={post.post.likesCount}
      commentsCount={post.post.commentsCount}
      />
    ))}
    </div>
  </div>
  );
}

export default SavedGrid;
