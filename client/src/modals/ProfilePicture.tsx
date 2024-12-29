import { useDispatch } from "react-redux";
import { closeProfileModal } from "../redux/commonSlice";
import { useEffect, useRef } from "react";
import axiosErrorManager from "../utilities/axiosErrorManager";
import axiosInstance from "../utilities/axiosInstance";
import { updateUserProfilePicture } from "../redux/userSlice";

function ProfilePicture(): JSX.Element {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);  // Reference to the file input

    useEffect(() => {
        // Disable scrolling when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'auto';
        };
    }, []);

    const removeProfile = async () => {
        try {
            const response = await axiosInstance.delete(`/user/remove_profile_picture`);
            dispatch(closeProfileModal());
            dispatch(updateUserProfilePicture(response.data.profile));
            console.log(response.data);
        } catch (error) {
            dispatch(closeProfileModal());
            console.log(axiosErrorManager(error));
        }
    };

    const uploadProfile = () => {
        // Trigger file input click when the "Upload Image" button is clicked
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Get the selected file

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axiosInstance.post('/user/update_user_profile_picture', formData, {
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
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <p className="text-lg font-semibold text-center mb-4">Change Profile Picture</p>
                <div className="flex justify-between mb-4">
                    <button
                        onClick={uploadProfile}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Upload Image
                    </button>
                    <button
                        onClick={removeProfile}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Remove
                    </button>
                </div>
                <button
                    onClick={() => dispatch(closeProfileModal())}
                    className="bg-gray-300 text-black px-4 py-2 rounded-lg w-full hover:bg-gray-400 transition duration-200"
                >
                    Cancel
                </button>

                {/* Hidden file input */}
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
