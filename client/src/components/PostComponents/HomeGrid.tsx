import { useEffect, useState, useCallback } from "react";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { Post } from "../../utilities/interfaces";
import HomePostCard from "../../shared/HomePostCard";

function HomeGrid(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchHomeFeed = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/user/post/home_page?page=${page}&limit=2`
      );
      const newPosts = response.data.posts;

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      }
    } catch (error) {
      console.log(axiosErrorManager(error));
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
    fetchHomeFeed();
  }, [fetchHomeFeed]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="flex flex-col items-center w-screen lg:w-auto justify-center min-h-screen">
      {posts.map((post, index) => (
        <HomePostCard
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
      {loading && (
        <div className="flex items-center justify-center w-screen lg:w-full h-screen">
          <div className="spinner"></div>
        </div>
      )}
      {!loading && !hasMore && <p>No more posts available</p>}
    </div>
  );
}

export default HomeGrid;
