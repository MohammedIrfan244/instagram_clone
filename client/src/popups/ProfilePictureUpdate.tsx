import { useDispatch } from "react-redux";
import { closeProfileModal } from "../redux/commonSlice";
import { useEffect, useRef } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";
import { updateUserProfilePicture } from "../redux/userSlice";

function ProfilePicture(): JSX.Element {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);  

    useEffect(() => {
       
        document.body.style.overflow = 'hidden';

        return () => {
           
            document.body.style.overflow = 'auto';
        };
    }, []);

    const removeProfile = async () => {
        try {
            const response = await axiosInstance.delete(`/user/delete_user/profile_picture`);
            dispatch(closeProfileModal());
            dispatch(updateUserProfilePicture(response.data.profile));
            console.log(response.data);
        } catch (error) {
            dispatch(closeProfileModal());
            console.log(axiosErrorManager(error));
        }
    };

    const uploadProfile = () => {
        
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; 

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axiosInstance.post('/user/update_user/profile_picture', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                dispatch(closeProfileModal());
                dispatch(updateUserProfilePicture(response.data.profile));
                console.log(response.data);
            } catch (error) {
                dispatch(closeProfileModal());
                console.log(axiosErrorManager(error));
            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#262626] rounded-lg shadow-lg w-96">
                <p className="text-lg py-5 border-b border-gray-700 text-center">Change Profile Photo</p>
                    <button
                        onClick={uploadProfile}
                        className="text-blue-400 py-3 border-b border-gray-700 text-sm font-semibold w-full text-center"
                    >
                        Upload Image
                    </button>
                    <br />
                    <button
                        onClick={removeProfile}
                        className="text-red-400 py-3 border-b border-gray-700 text-sm font-semibold w-full text-center"
                    >
                        Remove Current Photo
                    </button>
                <button
                    onClick={() => dispatch(closeProfileModal())}
                    className="text-gray-400 text-sm font-semibold w-full py-3 text-center"
                >
                    Cancel
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}

export default ProfilePicture;
