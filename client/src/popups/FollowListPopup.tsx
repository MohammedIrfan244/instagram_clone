import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeFollowList } from "../redux/commonSlice";
import axiosInstance from "../utilities/axiosInstance";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { User } from "../utilities/interfaces";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface FollowListProps {
  title: string;
  _id: string;
  removeFollower: (id: string) => void;
  currUser: boolean;
}

interface FollowerList {
  follower: User;
}

interface FollowingList {
  following: User;
}

function FollowListPopup({ title, _id, removeFollower, currUser }: FollowListProps): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [followerList, setFollowerList] = useState<FollowerList[]>([]);
  const [followingList, setFollowingList] = useState<FollowingList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getFollowerList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/follower_list/${_id}`);
      setFollowerList(response.data.followers);
    } catch (error) {
      console.log(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  const getFollowingList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/user/following_list/${_id}`);
      setFollowingList(response.data.following);
    } catch (error) {
      console.log(axiosErrorManager(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (title === "Followers") {
      getFollowerList();
    } else if (title === "Following") {
      getFollowingList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#202020] rounded-lg w-[400px] h-[400px] overflow-y-auto relative">
        <button className="absolute top-2 text-xl right-2" onClick={() => dispatch(closeFollowList())}>
          <IoClose />
        </button>
        <p className="text-white text-sm text-center font-semibold py-3 border-b border-gray-700">{title}</p>

        <div className="w-full h-auto pt-3 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#202020] bg-opacity-80">
              <span className="spinner"></span>
            </div>
          )}

          {!loading && title === "Followers" && followerList.map((follower) => (
            <div className="py-2 px-2 flex justify-between items-center" key={follower.follower._id}>
              <div className="flex gap-2 items-center">
                <img
                  onClick={() => {
                    navigate(`/${follower.follower.username}`)
                    dispatch(closeFollowList())
                  }}
                  src={follower.follower.profile}
                  alt="profile"
                  className="w-10 h-10 hover:cursor-pointer rounded-full"
                />
                <div className="text-xs">
                  <p>{follower.follower.username}</p>
                  <p>{follower.follower.fullname}</p>
                </div>
              </div>
              <button
                className="bg-[#7B7B7B] h-7 px-5 text-xs rounded-md text-center text-white"
                onClick={
                  currUser
                    ? () => removeFollower(follower.follower._id)
                    : () => navigate(`/${follower.follower.username}`)
                }
              >
                {currUser ? "Remove" : "View"}
              </button>
            </div>
          ))}

          {!loading && title === "Following" && followingList.map((following) => (
            <div className="py-2 px-2 flex justify-between items-center" key={following.following._id}>
              <div className="flex gap-2 items-center">
                <img
                  onClick={() => {
                    navigate(`/${following.following.username}`)
                    dispatch(closeFollowList())
                  }}
                  src={following.following.profile}
                  alt="profile"
                  className="w-10 h-10 hover:cursor-pointer rounded-full"
                />
                <div className="text-xs">
                  <p>{following.following.username}</p>
                  <p>{following.following.fullname}</p>
                </div>
              </div>
              <button
                className="bg-[#7B7B7B] h-7 px-5 text-xs rounded-md text-center text-white"
                onClick={
                  currUser
                    ? () => removeFollower(following.following._id)
                    : () => navigate(`/${following.following.username}`)
                }
              >
                {currUser ? "Remove" : "View"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowListPopup;
