// ReelPage.tsx
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { useEffect, useState, useCallback } from "react";
import { Post } from "../../utilities/interfaces";
import ReelPostCard from "../../shared/ReelPostCard";

function ReelPage(): JSX.Element {
  const [reels, setReels] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [activeAudioId, setActiveAudioId] = useState<string | null>(null);
  const [isGloballyMuted, setIsGloballyMuted] = useState<boolean>(true);

  const fetchReels = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/user/post/reel_page?page=${page}&limit=10`
      );
      const newReels = response.data.reels;

      if (newReels.length === 0) {
        setHasMore(false);
      } else {
        setReels((prevReels) => [...prevReels, ...newReels]);
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
    fetchReels();
  }, [fetchReels]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleAudioToggle = (reelId: string) => {
    if (isGloballyMuted) {
      setIsGloballyMuted(false);
      setActiveAudioId(reelId);
    } else if (activeAudioId === reelId) {
      setIsGloballyMuted(true);
      setActiveAudioId(null);
    } else {
      setActiveAudioId(reelId);
    }
  };

  const handleReelInView = (reelId: string, isInView: boolean) => {
    if (isInView && !isGloballyMuted) {
      setActiveAudioId(reelId);
    }
  };

  return (
    <div className="lg:ps-[250px] flex flex-col items-center">
    {loading && (
      <div className="h-[500px] w-[300px] flex justify-center items-center">
        <span className="spinner" />
      </div>
    )}
    {!loading && reels.length === 0 && <p>No reels available</p>}
    {reels.map((reel, index) => (
      <ReelPostCard
        key={index + reel._id}
        id={reel._id}
        media={reel.media}
        username={reel.username}
        likesCount={reel.likesCount}
        commentsCount={reel.commentsCount}
        caption={reel.caption}
        isAudioActive={!isGloballyMuted && activeAudioId === reel._id}
        // isGloballyMuted={isGloballyMuted}
        onAudioToggle={() => handleAudioToggle(reel._id)}
        onInView={(isInView) => handleReelInView(reel._id, isInView)}
      />
    ))}
  </div>
  );
}

export default ReelPage;