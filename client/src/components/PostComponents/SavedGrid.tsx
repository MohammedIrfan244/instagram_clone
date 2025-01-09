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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center w-full h-96">
          <div className="spinner"></div>
        </div>
      )}
      {!loading && posts.length === 0 && <p>No saved posts available</p>}
      {!loading &&
        posts.map((savedPost, index) => (
          <PostCard
            key={index}
            isReel={savedPost.post.isReel}
            id={savedPost.post._id}
            media={savedPost.post.media}
            likesCount={savedPost.post.likesCount}
            commentsCount={savedPost.post.commentsCount}
          />
        ))}
    </div>
  );
}

export default SavedGrid;
