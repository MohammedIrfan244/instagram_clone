import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProfilePicture from "../popups/ProfilePicture";
import FollowList from "../popups/FollowList";
import { openProfileModal, openFollowList } from "../redux/commonSlice";
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";
import { RootState } from "../redux/store";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";


interface FollowCount {
  followerCount: number;
  followingCount: number;
}

function CurrenUserProfile(): JSX.Element {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const { profileModal, followList } = useSelector((state: RootState) => state.common);
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [followCount, setFollowCount] = useState<FollowCount>({ followerCount: 0, followingCount: 0 });

  // Fetch follow count
  const getFollowerCount = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/user/follow_count/${currentUser?._id}`);
      setFollowCount(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  // Remove a following
  const removeFollowing = async (id: string): Promise<void> => {
    try {
      const response = await axiosInstance.post(`/user/follow_user/`, {
        followingId: id
      });
      getFollowerCount();
      console.log(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  // Remove a follower
  const removeFollower = async (id: string): Promise<void> => {
    try {
      const response = await axiosInstance.delete(`/user/remove_follow/${id}`);
      getFollowerCount();
      console.log(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  useEffect(() => {
    if (currentUser) {
      getFollowerCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Handle click for followers
  const handleFollowersClick = (): void => {
    setTitle("Followers");
    dispatch(openFollowList());
  };

  // Handle click for following
  const handleFollowingsClick = (): void => {
    setTitle("Following");
    dispatch(openFollowList());
  };

  return (
    <>
      {/* profile section */}
      <div className="flex h-[250px] items-center">
        <div className="w-[400px] flex justify-center h-full items-center">
          <img
            src={currentUser?.profile}
            className="w-[150px] h-[150px] hover:cursor-pointer rounded-full"
            alt="profile"
            onClick={() => dispatch(openProfileModal())}
          />
        </div>
        <div className="space-y-5">
          <div className="flex gap-3">
            <p className="text-lg">{currentUser?.username}</p>
            <button className="text-sm bg-[#262626] px-3 py-1 rounded-md" onClick={() => navigate('/account/edit')}>
              Edit Profile
            </button>
            <button className="text-sm bg-[#262626] px-3 py-1 rounded-md">View Archive</button>
            <button className="text-3xl" onClick={() => navigate('/account/edit')}>
              <IoIosSettings />
            </button>
          </div>
          <div className="flex gap-10">
            <p>0 posts</p>
            <button onClick={handleFollowersClick}>{followCount.followerCount} followers</button>
            <button onClick={handleFollowingsClick}>{followCount.followingCount} following</button>
          </div>
          <p className="text-sm">{currentUser?.fullname}</p>
          <p className="text-sm">{currentUser?.bio}</p>
          {profileModal && <ProfilePicture />}
          {currentUser?._id && followList && <FollowList currUser={true} removeFollower={title === "Followers" ? removeFollower : removeFollowing} title={title} _id={currentUser._id} />}
        </div>
      </div>

      {/* highlight section */}
      <div className="border-b border-gray-700"></div>

      {/* post section */}
      <div></div>
    </>
  );
}

export default CurrenUserProfile;
