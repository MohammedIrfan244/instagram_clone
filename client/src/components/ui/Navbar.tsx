import { useState, useEffect } from 'react';
import instagram from '../../assets/instagram_text.png';
import { GoHome } from 'react-icons/go';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineExplore } from 'react-icons/md';
import { RiMessengerLine } from 'react-icons/ri';
import { IoMdHeartEmpty } from 'react-icons/io';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa6';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store'
import axiosInstance from '../../utilities/axiosInstance';
import axiosErrorManager from '../../utilities/axiosErrorManager';
import { User } from '../../utilities/interfaces';
import { openPostPopup } from '../../redux/commonSlice';
import PostPopup from '../../popups/PostPopup';

function Navbar() {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const {postPopup}=useSelector((state:RootState)=>state.common)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isSearchWindowOpen, setIsSearchWindowOpen] = useState(false);
  const [isMoreWindowOpen, setIsMoreWindowOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      }
    }, 200);

    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`user/get_users/${searchQuery}`);
      setSearchResults(response.data);
      console.log(searchResults);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const onSearchClick=(username:string)=>{
    navigate(`/${username}`)
    setIsSearchWindowOpen(false)
  }

  const handleLogout = async() => {
      try{
        await axiosInstance.post('/auth/logout')
        localStorage.removeItem('user')
        setIsMoreWindowOpen(false)
        navigate('/user/login')
    }catch(error){
      console.log(axiosErrorManager(error))
    }
  };

  return (
    <div className="flex">
      {/* Sidebar (Navbar) */}
      <div className="border-r border-gray-800 w-[250px] bg-black flex flex-col justify-evenly fixed h-full ps-5 pr-3">
        <img
          src={instagram}
          alt="instagram"
          className="w-[110px] mt-3 hover:cursor-pointer"
          onClick={() => navigate('/')}
        />
        <NavLink
          to={'/'}
          className="flex py-2 px-1 hover:bg-gray-700 rounded-lg text-sm items-center gap-3 mt-5"
        >
          <GoHome className="text-2xl" />
          Home
        </NavLink>
        <button
          className="flex py-2 px-1 hover:bg-gray-700 rounded-lg text-sm items-center gap-3"
          onClick={() => setIsSearchWindowOpen(!isSearchWindowOpen)}
        >
          <FiSearch className="text-2xl" />
          Search
        </button>
        <NavLink
          to={'/explore/_feed'}
          className="flex py-2 px-1 hover:bg-gray-700 rounded-lg text-sm items-center gap-3"
        >
          <MdOutlineExplore className="text-2xl" />
          Explore
        </NavLink>
        <NavLink
          to={'/feed/reels'}
          className="flex hover:bg-gray-700 rounded-lg items-center py-2 px-1 gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 50 50"
            style={{ fill: 'white' }}
          >
            <path
              d="M 15 4 C 8.9365932 4 4 8.9365932 4 15 L 4 35 C 4 41.063407 8.9365932 46 15 46 L 35 46 C 41.063407 46 46 41.063407 46 35 L 46 15 C 46 8.9365932 41.063407 4 35 4 L 15 4 z M 16.740234 6 L 27.425781 6 L 33.259766 16 L 22.574219 16 L 16.740234 6 z M 29.740234 6 L 35 6 C 39.982593 6 44 10.017407 44 15 L 44 16 L 35.574219 16 L 29.740234 6 z M 14.486328 6.1035156 L 20.259766 16 L 6 16 L 6 15 C 6 10.199833 9.7581921 6.3829803 14.486328 6.1035156 z M 6 18 L 44 18 L 44 35 C 44 39.982593 39.982593 44 35 44 L 15 44 C 10.017407 44 6 39.982593 6 35 L 6 18 z M 21.978516 23.013672 C 20.435152 23.049868 19 24.269284 19 25.957031 L 19 35.041016 C 19 37.291345 21.552344 38.713255 23.509766 37.597656 L 31.498047 33.056641 C 33.442844 31.951609 33.442844 29.044485 31.498047 27.939453 L 23.509766 23.398438 L 23.507812 23.398438 C 23.018445 23.120603 22.49297 23.001607 21.978516 23.013672 z M 21.982422 24.986328 C 22.158626 24.988232 22.342399 25.035052 22.521484 25.136719 L 30.511719 29.677734 C 31.220922 30.080703 31.220922 30.915391 30.511719 31.318359 L 22.519531 35.859375 C 21.802953 36.267773 21 35.808686 21 35.041016 L 21 25.957031 C 21 25.573196 21.201402 25.267385 21.492188 25.107422 C 21.63758 25.02744 21.806217 24.984424 21.982422 24.986328 z"
              fill="white"
              stroke="white"
              strokeWidth="1"
            ></path>
          </svg>
          Reels
        </NavLink>
        <NavLink
          to={'/accout/message'}
          className="flex hover:bg-gray-700 rounded-lg text-sm items-center gap-3 py-2 px-1"
        >
          <RiMessengerLine className="text-2xl" />
          Message
        </NavLink>
        <NavLink
          to={'/account/notification'}
          className="flex hover:bg-gray-700 rounded-lg text-sm items-center gap-3 py-2 px-1"
        >
          <IoMdHeartEmpty className="text-2xl" />
          Notifications
        </NavLink>
        <button
        onClick={()=>dispatch(openPostPopup())}
          className="flex hover:bg-gray-700 rounded-lg text-sm items-center gap-3 py-2 px-1"
        >
          <AiOutlinePlusSquare className="text-2xl" />
          Create
        </button>
        <div className="flex hover:cursor-pointer text-sm items-center gap-3 hover:bg-gray-700 rounded-lg py-2 px-1">
          <div className="rounded-full w-7 h-7 overflow-hidden relative">
            <img
              src={currentUser?.profile}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <NavLink to={`/${currentUser?.username}`}>Profile</NavLink>
        </div>
        <button
          className="flex hover:bg-gray-700 rounded-lg text-sm items-center gap-2 mt-3 py-2 px-1"
          onClick={() => setIsMoreWindowOpen(!isMoreWindowOpen)}
        >
          <FaBars className="text-2xl" />
          More
        </button>
      </div>

      {/* Search Window */}
      {isSearchWindowOpen && (
        <div className="fixed left-[250px] top-0 bg-black w-[350px] h-full z-50 p-5">
          <p className='text-lg pb-5 border-b border-gray-600'>Search</p>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 focus:outline-none text-xs text-white bg-gray-700 rounded-md my-3"
          />
          <div>
            {searchResults.length > 0 ? (
              searchResults.map((user, index) => (
                <div key={index} className="py-2">
                  <div onClick={() => onSearchClick(user.username)} className='flex hover:cursor-pointer gap-5 items-center'>
                    <img
                      src={user.profile}
                      alt="Profile"
                      className="object-cover w-10 h-10 rounded-full"
                    />
                    <div>
                    <p className="text-xs text-white">{user.username}</p>
                    <p className='text-xs text-white'>{user.fullname}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-sm text-white'>No results to show...</p>
            )}
          </div>
        </div>
      )}

      {/* More Popup */}
      {isMoreWindowOpen && (
        <div className="fixed left-[250px] bottom-0 bg-[#363636] w-[200px] shadow-lg z-50 rounded-lg">
          <button
            className="block w-full text-left px-2 py-3 text-sm border-b border-gray-600"
            onClick={()=>{
              setIsMoreWindowOpen(false);
              navigate('/account/edit')
            }}
          >
            Settings
          </button>
          <button
            className="block w-full text-left px-2 py-3 text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      {
        postPopup&&<PostPopup/>
      }
    </div>
  );
}

export default Navbar;
