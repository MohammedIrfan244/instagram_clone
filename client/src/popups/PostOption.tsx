import { useDispatch } from "react-redux";
import { closeOptionsPopup } from "../redux/commonSlice";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

interface PostOptionProps {
  isPost: boolean;
  isCurrentUser: boolean;
  onDelete: () => void
}

function PostOption({
  isPost,
  isCurrentUser,
  onDelete,
}: PostOptionProps): JSX.Element {
  const dispatch = useDispatch();
  const [shareText, setShareText] = useState("Copy Link"); 

  const copyToClipboard = () => {
    const url = window.location.href; 
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShareText("Copied"); 
        setTimeout(() => setShareText("Copy Link"), 2000); 
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center">
      <div className="w-[300px] h-[100px] relative text-white flex flex-col items-center bg-[#363636] rounded-lg">
        <button
          className="absolute text-sm font-semibold top-2 right-2"
          onClick={() => dispatch(closeOptionsPopup())}
        >
          <IoClose />
        </button>
        {isPost && (
          <button
            className="h-[50px] text-sm font-semibold border-gray-500 w-full border-b"
            onClick={copyToClipboard}
          >
            {shareText}
          </button>
        )}
        {isCurrentUser && (
          <button
            className="h-[50px] text-sm text-red-500 font-semibold border-gray-500 w-full border-b"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default PostOption;
