import { useParams } from "react-router-dom"
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";
import { UserDetail } from "../utilities/interfaces";
import { useEffect, useState } from "react";

const UserProfile = (): JSX.Element => {
    const { username } = useParams();
    const [currUser, setCurrUser] = useState<UserDetail | null>(null);
    const getUser=async()=>{
        try {
            const response=await axiosInstance.get(`/user/get_one_user/${username}`);
            setCurrUser(response.data.user);
        } catch (error) {
            console.log(axiosErrorManager(error));
        }
    }
    useEffect(()=>{
getUser()
    },[username])
    return (
        <div>
            <img src={currUser?.profile} alt="" />
            <p>{currUser?.username}</p>
            <button>Follow</button>
            <button>Message</button>
            <p>Post</p>
            <p>Followers</p>
            <p>Followind</p>
            <p>{currUser?.fullname}</p>
            <p>{currUser?.bio}</p>
        </div>
    );
};

export default UserProfile;
