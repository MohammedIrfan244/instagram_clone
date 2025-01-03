import { useEffect } from "react";
import PostPopupIcon from "../components/ui/PostPopupIcon";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closePostPopup } from "../redux/commonSlice";

function PostPopup(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-auto overflow-hidden h-auto rounded-2xl relative">
        <button onClick={()=>dispatch(closePostPopup())} className="absolute right-1 top-3 text-white"><IoMdClose /></button>
        <div className="bg-black w-[430px] h-[50px] flex justify-center items-center">
          <p className="text-white text-sm font-semibold">Create new post</p>
        </div>
        <div className="bg-[#262626] flex-col flex gap-5 justify-center items-center w-[430px] h-[430px]">
          <PostPopupIcon />
          <p className="text-white text-lg font-medium">Choose photos and videos here</p>
          <button className="text-white text-xs rounded-md font-semibold bg-blue-500 px-3 py-2">
            Select from computer
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostPopup;
