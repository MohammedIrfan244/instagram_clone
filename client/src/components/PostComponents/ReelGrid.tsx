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
        <div className="w-full h-[300px] flex items-center justify-center">
          <span className="spinner"></span>
        </div>
      )}
    <div className="grid-cols-3 grid w-screen lg:w-auto gap-1">
      {!loading && reels.length === 0 && <p>No posts available</p>}
      {reels.map((post, index) => (
        <ReelCard
        key={index}
        id={post._id}
        media={post.media}
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        />
      ))}
      </div>
    </div>
  );
}

export default ReelGrid;
