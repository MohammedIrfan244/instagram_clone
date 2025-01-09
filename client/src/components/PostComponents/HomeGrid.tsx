import { useEffect, useState } from "react";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { Post } from "../../utilities/interfaces";
import HomePostCard from "../../shared/HomePostCard";

function HomeGrid(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHomeFeed = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/user/post/home_page");
      setPosts(response.data.posts);
    } catch (error) {
      console.log(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/user/post/delete_post/${id}`);
      fetchHomeFeed();
      console.log(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  useEffect(() => {
    fetchHomeFeed();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && (
        <div className="flex items-center justify-center w-full h-screen">
          <div className="spinner"></div>
        </div>
      )}
      {!loading && posts.length === 0 && <p>No posts available</p>}
      {!loading &&
        posts.map((post, index) => (
          <HomePostCard
            onDelete={() => {
              deletePost(post._id);
            }}
            key={index}
            id={post._id}
            media={post.media}
            username={post.username}
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            caption={post.caption}
            isReel={post.isReel}
          />
        ))}
    </div>
  );
}

export default HomeGrid;
