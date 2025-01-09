import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import PostCard from "../../shared/PostCard";
import { Post } from "../../utilities/interfaces";

function ExploreGrid(): JSX.Element {
  const [feed, setFeed] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchFeed = async (): Promise<void> => {
    try {
      const url = "/user/post/explore_page";
      setLoading(true);
      const response = await axiosInstance.get(url);
      setFeed(response.data?.posts || []);
    } catch (error) {
      console.error(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 pt-16 pe-20 ps-28 h-auto">
      {loading && (
        <div className="w-[300px] h-[300px] bg-[#363636] flex items-center justify-center">
          <span className="spinner"></span>
        </div>
      )}
      {!loading && feed.length === 0 && <p>No feed available</p>}
      {feed.map((post, index) => (
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
  );
}

export default ExploreGrid;
