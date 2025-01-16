import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeCretePopup, openPostPopup, openStoryPopup } from "../redux/commonSlice";

function CreatePopup(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#262626] rounded-lg shadow-lg w-96">
        
        <button
          onClick={() => dispatch(closeCretePopup())}
          className="absolute right-3 top-3 text-white text-lg"
        >
          <IoMdClose />
        </button>

        <p className="text-lg py-5 border-b border-gray-700 text-center">Choose an Option</p>

        <div className="flex flex-col items-center py-5 gap-4">
          <button 
            onClick={() => {dispatch(openPostPopup()); dispatch(closeCretePopup());}} 
            className="w-full py-1 text-sm font-semibold text-blue-400 border-b border-gray-700"
          >
            Post
          </button>
          <button 
            onClick={() => {dispatch(openStoryPopup()); dispatch(closeCretePopup());}} 
            className="w-full py-1 text-sm font-semibold text-blue-400 "
          >
            Story
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePopup;
