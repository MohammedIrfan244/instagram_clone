import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FollowList from "../../popups/FollowListPopup";
import { openProfileModal, openFollowList } from "../../redux/commonSlice";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { RootState } from "../../redux/store";
import { IoIosSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ProfilePictureUpdate from "../../popups/ProfilePictureUpdatePopup";
import GreyButton from "../ui/GreyButton";
import { IoMdGrid } from "react-icons/io";
import { MdBookmarkBorder } from "react-icons/md";
import PostGrid from "../PostComponents/PostGrid";
import ReelGrid from "../PostComponents/ReelGrid";
import SavedGrid from "../PostComponents/SavedGrid";

interface FollowCount {
  followerCount: number;
  followingCount: number;
}

function CurrenUserProfile(): JSX.Element {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const { profileModal, followList } = useSelector((state: RootState) => state.common);
  const [component, setComponent] = useState<string>("post");
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [followCount, setFollowCount] = useState<FollowCount>({ followerCount: 0, followingCount: 0 });
  const [loadingImage, setLoadingImage] = useState<boolean>(true); // For image loading

  const getFollowerCount = async (): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/user/follow_count/${currentUser?._id}`);
      setFollowCount(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const removeFollowing = async (id: string): Promise<void> => {
    try {
      const response = await axiosInstance.post(`/user/follow_user/`, {
        followingId: id,
      });
      getFollowerCount();
      console.log(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

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

  const handleImageLoad = () => {
    setLoadingImage(false); // Hide spinner once the image is loaded
  };

  const handleFollowersClick = (): void => {
    setTitle("Followers");
    dispatch(openFollowList());
  };

  const handleFollowingsClick = (): void => {
    setTitle("Following");
    dispatch(openFollowList());
  };

  return (
    <>
      <div className="flex h-[250px] items-center">
        <div className="w-[400px] flex justify-center h-full items-center">
          <div className="relative w-[150px] h-[150px] rounded-full">
            {loadingImage && (
              <div className="absolute inset-0 flex justify-center items-center bg-[#363636] rounded-full">
                <span className="spinner"></span> {/* Replace with your spinner */}
              </div>
            )}
            <img
              src={currentUser?.profile}
              className="w-[150px] h-[150px] hover:cursor-pointer rounded-full"
              alt="profile"
              onLoad={handleImageLoad}
              onClick={() => dispatch(openProfileModal())}
            />
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex gap-3">
            <p className="text-lg">{currentUser?.username}</p>
            <GreyButton
              styles="text-sm bg-[#262626] px-3 py-1 rounded-md"
              loading={false}
              loadingText={""}
              text="Edit Profile"
              onClick={() => navigate("/account/edit")}
            />
            <GreyButton
              styles="text-sm bg-[#262626] px-3 py-1 rounded-md"
              loading={false}
              loadingText={""}
              text="View Archive"
              onClick={() => {}}
            />
            <button className="text-3xl" onClick={() => navigate("/account/edit")}>
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
          {profileModal && <ProfilePictureUpdate />}
          {currentUser?._id && followList && (
            <FollowList
              currUser={true}
              removeFollower={title === "Followers" ? removeFollower : removeFollowing}
              title={title}
              _id={currentUser._id}
            />
          )}
        </div>
      </div>

      {/* highlight section */}
      <div></div>

      {/* post section */}
      <div className="border-t border-gray-800 mx-24 h-auto">
        <div className="h-10 flex items-center gap-20 text-gray-400 font-extralight text-sm justify-center">
          <button
            className={`flex items-center gap-2 ${component === "post" ? "text-white font-semibold" : ""}`}
            onClick={() => setComponent("post")}
          >
            <IoMdGrid /> Posts
          </button>
          <button
            className={`flex items-center gap-2 ${component === "reel" ? "text-white font-semibold" : ""}`}
            onClick={() => setComponent("reel")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 50 50">
              <path
                d="M 15 4 C 8.9365932 4 4 8.9365932 4 15 L 4 35 C 4 41.063407 8.9365932 46 15 46 L 35 46 C 41.063407 46 46 41.063407 46 35 L 46 15 C 46 8.9365932 41.063407 4 35 4 L 15 4 z M 16.740234 6 L 27.425781 6 L 33.259766 16 L 22.574219 16 L 16.740234 6 z M 29.740234 6 L 35 6 C 39.982593 6 44 10.017407 44 15 L 44 16 L 35.574219 16 L 29.740234 6 z M 14.486328 6.1035156 L 20.259766 16 L 6 16 L 6 15 C 6 10.199833 9.7581921 6.3829803 14.486328 6.1035156 z M 6 18 L 44 18 L 44 35 C 44 39.982593 39.982593 44 35 44 L 15 44 C 10.017407 44 6 39.982593 6 35 L 6 18 z M 21.978516 23.013672 C 20.435152 23.049868 19 24.269284 19 25.957031 L 19 35.041016 C 19 37.291345 21.552344 38.713255 23.509766 37.597656 L 31.498047 33.056641 C 33.442844 31.951609 33.442844 29.044485 31.498047 27.939453 L 23.509766 23.398438 L 23.507812 23.398438 C 23.018445 23.120603 22.49297 23.001607 21.978516 23.013672 z M 21.982422 24.986328 C 22.158626 24.988232 22.342399 25.035052 22.521484 25.136719 L 30.511719 29.677734 C 31.220922 30.080703 31.220922 30.915391 30.511719 31.318359 L 22.519531 35.859375 C 21.802953 36.267773 21 35.808686 21 35.041016 L 21 25.957031 C 21 25.573196 21.201402 25.267385 21.492188 25.107422 C 21.63758 25.02744 21.806217 24.984424 21.982422 24.986328 z"
                fill="white"
                stroke="white"
                strokeWidth="1"
              ></path>
            </svg>{" "}
            Reels
          </button>
          <button
            className={`flex items-center gap-2 ${component === "saved" ? "text-white font-semibold" : ""}`}
            onClick={() => setComponent("saved")}
          >
            <MdBookmarkBorder /> Saved
          </button>
        </div>
        {component === "post" ? (
          <PostGrid isCurrUser={true} username="" />
        ) : component === "reel" ? (
          <ReelGrid isCurrUser={true} username="" />
        ) : (
          <SavedGrid />
        )}
      </div>
    </>
  );
}

export default CurrenUserProfile;
