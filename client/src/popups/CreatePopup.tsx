import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeCretePopup, openPostPopup, openStoryPopup } from "../redux/commonSlice";

function CreatePopup(): JSX.Element {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#262626] rounded-lg w-[300px] relative overflow-hidden">
        
        <button
          onClick={() => dispatch(closeCretePopup())}
          className="absolute right-3 top-3 text-white text-lg"
        >
          <IoMdClose />
        </button>
        
        
        <div className="bg-black w-full h-[50px] flex justify-center items-center">
          <p className="text-white text-sm font-semibold">Choose an Option</p>
        </div>

        
        <div className="flex flex-col items-center py-5 gap-4">
          <button onClick={() => {dispatch(openPostPopup()); dispatch(closeCretePopup());}} className="w-[200px] py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600">
            Post
          </button>
          <button onClick={() => {dispatch(openStoryPopup()); dispatch(closeCretePopup());}} className="w-[200px] py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600">
            Story
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePopup;
