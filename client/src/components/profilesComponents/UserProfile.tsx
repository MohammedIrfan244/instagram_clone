import { useNavigate, useParams } from "react-router-dom";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { UserDetail } from "../../utilities/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FollowList from "../../popups/FollowListPopup";
import { openFollowList } from "../../redux/commonSlice";
import PostGrid from "../PostComponents/PostGrid";
import ReelGrid from "../PostComponents/ReelGrid";
import { IoMdGrid } from "react-icons/io";
import GreyButton from "../ui/GreyButton";

interface FollowCount {
    followerCount: number;
    followingCount: number;
}

const UserProfile = (): JSX.Element => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const { followList } = useSelector((state: RootState) => state.common);
    const [component, setComponent] = useState<string>("post");
    const [currUser, setCurrUser] = useState<UserDetail | null>(null);
    const [title, setTitle] = useState<string>("");
    const [followCount, setFollowCount] = useState<FollowCount>({ followerCount: 0, followingCount: 0 });
    const [followState, setFollowState] = useState<boolean>(false);
    const [loadingImage, setLoadingImage] = useState<boolean>(true);

    const getUser = async () => {
        try {
            const response = await axiosInstance.get(`/user/get_one_user/${username}`);
            setCurrUser(response.data.user);
        } catch (error) {
            console.log(axiosErrorManager(error));
        }
    };

    const handleFollow = async () => {
        try {
            await axiosInstance.post(`/user/follow_user`, { followingId: currUser?._id });
            getFollowStatus();
            getFollowerCount();
        } catch (error) {
            console.log(axiosErrorManager(error));
        }
    };

    const getFollowerCount = async () => {
        try {
            const response = await axiosInstance.get(`/user/follow_count/${currUser?._id}`);
            setFollowCount(response.data);
        } catch (error) {
            console.log(axiosErrorManager(error));
        }
    };

    const getFollowStatus = async () => {
        try {
            const response = await axiosInstance.get(`/user/follow_status/${currUser?._id}`);
            setFollowState(response.data.isFollowing);
        } catch (error) {
            console.log(axiosErrorManager(error));
        }
    };

    useEffect(() => {
        if (username) {
            getUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    useEffect(() => {
        if (currUser) {
            getFollowStatus();
            getFollowerCount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currUser]);

    const handleFollowersClick = () => {
        setTitle("Followers");
        dispatch(openFollowList());
    };

    const handleFollowingsClick = () => {
        setTitle("Following");
        dispatch(openFollowList());
    };

    const handleImageLoad = () => {
        setLoadingImage(false);
    };

    return (
        <>
            {/* Profile Section */}
            <div className="flex lg:h-[250px] flex-col lg:flex-row mt-20 lg:mt-0 items-center">
                <div className="w-screen flex h-auto items-center py-3 lg:py-0">
                    <div className="h-auto w-[100px] lg:w-[400px] flex justify-center items-center">
                        <div className="relative w-[75px] lg:w-[150px] h-[75px] lg:h-[150px] rounded-full">
                            {loadingImage && (
                                <div className="absolute inset-0 flex justify-center items-center bg-[#363636] rounded-full">
                                    <span className="spinner" />
                                </div>
                            )}
                            <img
                                src={currUser?.profile}
                                className="w-full h-full object-cover hover:cursor-pointer rounded-full"
                                alt="profile"
                                onLoad={handleImageLoad}
                            />
                        </div>
                    </div>
                    <div className="space-y-5 ps-2 lg:ps-0">
                        <div className="flex flex-col lg:flex-row gap-3">
                            <p className="text-lg">{currUser?.username}</p>
                            <div className="space-x-3">
                                <GreyButton loadingText={"Following..."} styles="text-sm  px-4 py-2 rounded-md" text={followState ? "Unfollow" : "Follow"} loading={false} onClick={handleFollow} />
                                <GreyButton styles="text-sm  px-4 py-2 rounded-md" text={"Message"} loadingText={"Messaging..."} loading={false} onClick={() => navigate(  `/direct/t/${currUser?.username}`)} />
                            </div>
                        </div>
                        <div className="gap-10 hidden lg:flex">
                            <p>{currUser?.totalPosts} posts</p>
                            <button onClick={handleFollowersClick}>{followCount.followerCount} followers</button>
                            <button onClick={handleFollowingsClick}>{followCount.followingCount} following</button>
                        </div>
                        <div className="hidden lg:block space-y-2 ">
                            <p className="text-sm">{currUser?.fullname}</p>
                            <p className="text-sm">{currUser?.bio}</p>
                        </div>
                        {currUser?._id && followList && <FollowList currUser={false} removeFollower={() => { }} title={title} _id={currUser?._id} />}
                    </div>
                </div>
                <div className="lg:hidden p-5 space-y-2 ">
                    <p className="text-sm font-semibold">{currUser?.fullname}</p>
                    <p className="text-sm">{currUser?.bio}</p>
                </div>
                <div className="lg:hidden w-full flex items-center justify-around">
                    <div className="flex flex-col items-center">
                        <p className="font-semibold">{currUser?.totalPosts}</p>
                        <p className="font-extralight">posts</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-semibold">{followCount.followerCount}</p>
                        <p className="font-extralight">followers</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="font-semibold">{followCount.followingCount}</p>
                        <p className="font-extralight">following</p>
                    </div>
                </div>
            </div>
            {/* Highlight Section */}
            <div></div>
            {/* Post Section */}
            <div className="border-t border-gray-800 mx-24 h-auto">
                <div className="h-10 flex items-center gap-20 text-gray-400 font-extralight text-sm justify-center">
                    <button className="flex items-center gap-2" onClick={() => setComponent("post")}>
                        <IoMdGrid /> Posts
                    </button>
                    <button className="flex items-center gap-2" onClick={() => setComponent("reel")}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0px"
                            y="0px"
                            width="15"
                            height="15"
                            viewBox="0 0 50 50"
                            style={{ fill: 'white' }}
                        >
                            <path
                                d="M 15 4 C 8.9365932 4 4 8.9365932 4 15 L 4 35 C 4 41.063407 8.9365932 46 15 46 L 35 46 C 41.063407 46 46 41.063407 46 35 L 46 15 C 46 8.9365932 41.063407 4 35 4 L 15 4 z M 16.740234 6 L 27.425781 6 L 33.259766 16 L 22.574219 16 L 16.740234 6 z M 29.740234 6 L 35 6 C 39.982593 6 44 10.017407 44 15 L 44 16 L 35.574219 16 L 29.740234 6 z M 14.486328 6.1035156 L 20.259766 16 L 6 16 L 6 15 C 6 10.199833 9.7581921 6.3829803 14.486328 6.1035156 z M 6 18 L 44 18 L 44 35 C 44 39.982593 39.982593 44 35 44 L 15 44 C 10.017407 44 6 39.982593 6 35 L 6 18 z M 21.978516 23.013672 C 20.435152 23.049868 19 24.269284 19 25.957031 L 19 35.041016 C 19 37.291345 21.552344 38.713255 23.509766 37.597656 L 31.498047 33.056641 C 33.442844 31.951609 33.442844 29.044485 31.498047 27.939453 L 23.509766 23.398438 L 23.507812 23.398438 C 23.018445 23.120603 22.49297 23.001607 21.978516 23.013672 z M 21.982422 24.986328 C 22.158626 24.988232 22.342399 25.035052 22.521484 25.136719 L 30.511719 29.677734 C 31.220922 30.080703 31.220922 30.915391 30.511719 31.318359 L 22.519531 35.859375 C 21.802953 36.267773 21 35.808686 21 35.041016 L 21 25.957031 C 21 25.573196 21.201402 25.267385 21.492188 25.107422 C 21.63758 25.02744 21.806217 24.984424 21.982422 24.986328 z"
                                fill="white"
                                stroke="white"
                                strokeWidth="1"
                            ></path>
                        </svg> Reels
                    </button>
                </div>
                {component === "post" ? (
                    <PostGrid isCurrUser={false} username={username || ""} />
                ) : (
                    <ReelGrid isCurrUser={false} username={username || ""} />
                )}
            </div>
        </>
    );
};

export default UserProfile;
