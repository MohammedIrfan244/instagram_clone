import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { User } from "../../utilities/interfaces";
import HomeButton from "./HomeButton";
import ExploreButton from "./ExploreButton";
import MessageButton from "./MessageButton";
import NotificationButton from "./NotificationButton";
import { FaInstagram } from "react-icons/fa";
import AddButton from "./AddButton";
import ReelsButton from "./ReelsButton";
import InstaText from "./InstaText";
import SearchButton from "./SearchButton";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import axiosInstance from "../../utilities/axiosInstance";
import { FaBars } from "react-icons/fa6";
import CreatePopup from "../../popups/CreatePopup";
import PostPopup from "../../popups/PostPopup";
import StoryPopup from "../../popups/StoryPopup";
import { IoCloseCircleSharp } from "react-icons/io5";

function Navbar() {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);
  const [isMoreWindowOpen, setIsMoreWindowOpen] = useState(false);
  const { createPopup,postPopup,storyPopup } = useSelector((state: RootState) => state.common);
  const navigate = useNavigate();

  const onSearchClick = (username: string) => {
    setIsSearchWindowOpen(false);
    navigate(`/${username}`);
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      localStorage.removeItem("user");
      setIsMoreWindowOpen(false);
      navigate("/user/login");
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  return (
    <div className="flex">
      {/* Sidebar for large screens */}
      <div className="border-r border-gray-800 w-[250px] bg-black flex-col justify-evenly fixed h-full ps-5 pr-3 hidden lg:flex">
        <InstaText styles="w-[110px] mt-3 hover:cursor-pointer" />
        <HomeButton />
        <SearchButton searchClick={() => setIsSearchWindowOpen(!isSearchWindowOpen)} />
        <ExploreButton />
        <ReelsButton />
        <MessageButton />
        <NotificationButton />
        <AddButton />
        <div className="flex hover:cursor-pointer items-center gap-3 hover:bg-gray-700 rounded-lg py-2 px-1">
          <div className="rounded-full w-7 h-7 overflow-hidden relative">
            <img
              src={currentUser?.profile}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <NavLink
            to={`/${currentUser?.username}`}
            className={({ isActive }) => (isActive ? "font-semibold" : "")}
          >
            <span className="hidden lg:block">Profile</span>
          </NavLink>
        </div>
        <button
          className="flex hover:bg-gray-700 rounded-lg items-center gap-2 mt-3 py-2 px-1"
          onClick={() => setIsMoreWindowOpen(!isMoreWindowOpen)}
        >
          <FaBars className="text-2xl" />
          <span className="hidden lg:block">More</span>
        </button>
      </div>

      {/* Navbar for small screens */}
      <div className="lg:hidden fixed top-0 border-b border-gray-600 left-0 w-screen right-0 z-50 bg-black flex justify-between items-center px-4">
        <FaInstagram
          className="text-3xl text-white"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-4">
          <SearchButton searchClick={() => setIsSearchWindowOpen(!isSearchWindowOpen)} />
          <NotificationButton />
        </div>
      </div>

      {/* Sidebar for small screens */}
      <div className="lg:hidden z-50 fixed bottom-0 border-t border-gray-600 left-0 right-0 bg-black py-2 flex justify-around items-center w-screen">
        <ExploreButton />
        <ReelsButton />
        <AddButton />
        <MessageButton />
        <div onClick={()=>navigate(`/${currentUser?.username}`)} className="flex hover:cursor-pointer items-center gap-3 hover:bg-gray-700 rounded-lg py-2 px-1">
          <div className="rounded-full w-7 h-7 overflow-hidden relative">
            <img
              src={currentUser?.profile}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Search Window with close button */}
      {isSearchWindowOpen && (
  <div
    className={`fixed left-0 lg:left-16 top-0 border-x border-gray-600 lg:h-screen bg-black h-auto mt-20 rounded-md lg:mt-0 z-50 p-5 
      w-full ${isSearchWindowOpen ? "lg:w-[300px]" : "lg:w-0"} 
      transition-all duration-300`}
  >
    <div className="flex justify-end">
      <button
        onClick={() => setIsSearchWindowOpen(false)}
        className="text-white text-lg"
      >
        <IoCloseCircleSharp />
      </button>
    </div>
    <SearchBar onSearchResults={setSearchResults} />
    <SearchResults results={searchResults} onResultClick={onSearchClick} />
  </div>
)}


      {/* More Popup */}
      {isMoreWindowOpen && (
        <div className="fixed left-0 lg:left-[250px] bottom-0 bg-[#363636] w-[200px] shadow-lg z-50 rounded-lg">
          <button
            className="block w-full text-left px-2 py-3 border-b border-gray-600"
            onClick={() => {
              setIsMoreWindowOpen(false);
              navigate("/account/edit");
            }}
          >
            Settings
          </button>
          <button
            className="block w-full text-left px-2 py-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      {createPopup && <CreatePopup />}
      {postPopup && <PostPopup />}
      {storyPopup && <StoryPopup />}
    </div>
  );
}

export default Navbar;
