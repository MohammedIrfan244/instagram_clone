import { useParams } from "react-router-dom";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { UserDetail } from "../../utilities/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FollowList from "../../popups/FollowList";
import { openFollowList } from "../../redux/commonSlice";

interface FollowCount {
    followerCount: number;
    followingCount: number;
}

const UserProfile = (): JSX.Element => {
    const { username } = useParams();
    const dispatch = useDispatch();
    const { followList } = useSelector((state: RootState) => state.common);

    const [currUser, setCurrUser] = useState<UserDetail | null>(null);
    const [title, setTitle] = useState<string>("");
    const [followCount, setFollowCount] = useState<FollowCount>({ followerCount: 0, followingCount: 0 });
    const [followState, setFollowState] = useState<boolean>(false);

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

    return (
        <>
            {/* Profile Section */}
            <div className="flex h-[250px] items-center">
                <div className="w-[400px] flex justify-center h-full items-center">
                    <img
                        src={currUser?.profile}
                        className="w-[150px] h-[150px] rounded-full"
                        alt="profile"
                    />
                </div>
                <div className="space-y-5">
                    <div className="flex gap-3">
                        <p className="text-lg">{currUser?.username}</p>
                        <button
                            className="text-sm bg-gray-700 px-3 py-1 rounded-md"
                            onClick={handleFollow}
                        >
                            {followState ? "Unfollow" : "Follow"}
                        </button>
                        <button className="text-sm bg-gray-700 px-3 py-1 rounded-md">Message</button>
                    </div>
                    <div className="flex gap-10">
                        <p>0 posts</p>
                        <button onClick={handleFollowersClick}>
                            {followCount.followerCount} followers
                        </button>
                        <button onClick={handleFollowingsClick}>
                            {followCount.followingCount} following
                        </button>
                    </div>
                    <p className="text-sm">{currUser?.fullname}</p>
                    <p className="text-sm">{currUser?.bio}</p>
                    {currUser?._id && followList && <FollowList currUser={false} removeFollower={() => {}} title={title} _id={currUser?._id} />}
                </div>
            </div>
            {/* Highlight Section */}
            <div className="border-b border-gray-700"></div>
            {/* Post Section */}
            <div></div>
        </>
    );
};

export default UserProfile;
