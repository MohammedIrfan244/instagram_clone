import { useEffect, useState } from "react";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import ReelCard from "../../shared/ReelCard";
import { Post } from "../../utilities/interfaces";

interface ReelsProp {
  isCurrUser: boolean;
  username: string;
}

function ReelGrid({ isCurrUser, username }: ReelsProp) {
  const [reels, setReels] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const url = isCurrUser
        ? `/user/post/get_curruser_reels`
        : `/user/post/get_user_reels/${username}`;
      setLoading(true);
      const response = await axiosInstance.get(url);
      setReels(response.data.reels || []);
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
      {!loading && reels.length === 0 && <p>No reels available</p>}
      {!loading &&
        reels.map((reel, index) => (
          <ReelCard
            key={index}
            id={reel._id}
            media={reel.media}
            commentsCount={reel.commentsCount}
            likesCount={reel.likesCount}
          />
        ))}
    </div>
  );
}

export default ReelGrid;
