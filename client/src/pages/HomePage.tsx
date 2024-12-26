import instagram from '../assets/instagram_text.png'
import { MdHomeFilled } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdOutlineExplore } from "react-icons/md";
import { CiYoutube } from "react-icons/ci";
import { BsMessenger } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { FaBars } from "react-icons/fa6";
import { useSelector } from 'react-redux';



function HomePage(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {user} = useSelector((state: { user: any }) => state.user)
  return (
    <div className="flex w-full min-h-screen relative">
      <div className="border-r border-gray-800 w-[250px] flex flex-col justify-evenly fixed h-full ps-6">
        <img src={instagram} alt="instagram" className='w-[110px]' />
        <p className='flex text-sm items-center gap-3'><MdHomeFilled className='text-2xl' />Home</p>
        <p className='flex text-sm items-center gap-3'><FiSearch className='text-2xl' />Search</p>
        <p className='flex text-sm items-center gap-3'><MdOutlineExplore className='text-2xl' />Explore</p>
        <p className='flex text-sm items-center gap-3'><CiYoutube className='text-2xl'/>Reels</p>
        <p className='flex text-sm items-center gap-3'><BsMessenger className='text-2xl' />Message</p>
        <p className='flex text-sm items-center gap-3'><IoMdHeartEmpty className='text-2xl' />Notifications</p>
        <p className='flex text-sm items-center gap-3'><AiOutlinePlusSquare  className='text-2xl'/>Create</p>
        <div className='flex text-sm items-center gap-3'><div className='rounded-full w-7 h-7 overflow-hidden relative'>
        <img src={user?.profile} alt="Profile" className='object-cover w-full h-full' />
        </div>
        Profile</div>
        <p className='flex text-sm items-center gap-2 mt-3'><FaBars className='text-2xl' />More</p>
      </div>
      <div className='flex second'>
        <div className=''></div>
        <div></div>
      </div>
    </div>
  )
}

export default HomePage
