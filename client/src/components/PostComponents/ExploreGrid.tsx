import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import PostCard from "../../shared/PostCard";
import { Post } from "../../utilities/interfaces";

function ExploreGrid(): JSX.Element {
  const [feed, setFeed] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchFeed = useCallback(async () => {
    try {
      setLoading(true);
      const url = `/user/post/explore_page?page=${page}&limit=20`;
      const response = await axiosInstance.get(url);
      const newPosts = response.data?.posts || [];

      if (newPosts.length === 0) {
        setHasMore(false); 
      } else {
        setFeed((prevFeed) => [...prevFeed, ...newPosts]);
      }
    } catch (error) {
      console.error(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="grid w-screen lg:w-full grid-cols-3 gap-1 pt-16 lg:pe-20 lg:ps-28 h-auto">
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
      {loading && (
        <div className="w-full h-full flex items-center justify-center">
          <span className="spinner"></span>
        </div>
      )}
      {!loading && !hasMore && <p>No more posts available</p>}
    </div>
  );
}

export default ExploreGrid;
