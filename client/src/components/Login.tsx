import instagram from '../assets/instagram_text.png'
import { FaFacebook } from "react-icons/fa";
import playstore from '../assets/5a902dbf7f96951c82922875.png'
import windows from '../assets/5a902db47f96951c82922873.png'



function Login() {
  return (
    <>
    <div className="bg-black w-[350px] h-[415px] border border-gray-700 flex flex-col items-center px-10 pt-7">
      <div className='w-[190px] overflow-hidden'>
        <img src={instagram} alt="instagram" />
      </div>
      <form action="">
      <input type="text" className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-7' placeholder='Phone number, username, or email'/>
      <input type="text" className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-2' placeholder='Password'/>
      <button className='bg-blue-500 hover:bg-blue-600 w-full h-8 mt-4 rounded-lg text-xs font-semibold'>Log in</button>
      </form>
      <div className='flex items-center w-full h-auto justify-center gap-4 mt-7'>
        <div className='bg-gray-700 w-2/5 h-[1px]'/>
        <p className='text-gray-400 text-xs font-semibold'>OR</p>
        <div className='bg-gray-700 w-2/5 h-[1px]'/>
      </div>
      <button className="flex items-center gap-2 text-xs font-semibold text-blue-500 hover:text-white mt-7"><FaFacebook className='text-2xl text-blue-400' />Login with Facebook</button>
    <button className='text-xs mt-5'>Forgot password ?</button>
    </div>
    <div className='w-[350px] h-[60px] bg-black border border-gray-700 flex items-center mt-3 justify-center'>
        <p className='text-xs text-gray-100'>Don't have an account ?</p>
        <button className='text-xs text-blue-500 font-semibold ms-1'>Sign up</button>
    </div>
    <div className='w-[350px] h-[60px]'>
      <p className='text-xs text-gray-200 mt-4 text-center'>Get the app.</p>
      <div className='flex items-center mt-3 justify-center'>
      <img src={playstore} className='w-[150px]' alt="playstore" />
      <img src={windows} alt="windows" className='w-[110px]' />
      </div>
    </div>
    </>
  )
}

export default Login
