import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instagram from '../assets/instagram_text.png';
import { FaFacebook } from "react-icons/fa";
import playstore from '../assets/5a902dbf7f96951c82922875.png';
import windows from '../assets/5a902db47f96951c82922873.png';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/userSlice';


interface LoginData {
  identity: string;
  password: string;
}


function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const [error, setError] = useState<string | null>(null);
  const [loading,setLoading]=useState<boolean>(false)
  const [loginData, setLoginData] = useState<LoginData>({
    identity: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      setError(null);
      const response = await axios.post("http://localhost:3000/api/auth/user/login", loginData, {
        withCredentials: true,
      }
      )
      localStorage.setItem('user', JSON.stringify(response.data.userDetail));
      dispatch(setCurrentUser(response.data.userDetail))
      setLoginData({ identity: '', password: '' });
      navigate('/');
      setLoading(false)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        setError(error.response?.data?.message);
      } else {
        console.log(error);
      }
      setLoading(false)
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="bg-black w-[350px] h-[415px] border border-gray-700 flex flex-col items-center px-10 pt-7">
        <div className='w-[190px] overflow-hidden'>
          <img src={instagram} alt="instagram" />
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="identity"
            value={loginData.identity}
            onChange={handleInputChange}
            className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-7'
            placeholder='Username or Email'
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-2'
            placeholder='Password'
          />
          {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 w-full h-8 mt-4 rounded-lg text-xs font-semibold'>
            {loading?"Logging In":"Log In"}
          </button>
        </form>
        <div className='flex items-center w-full h-auto justify-center gap-4 mt-7'>
          <div className='bg-gray-700 w-2/5 h-[1px]' />
          <p className='text-gray-400 text-xs font-semibold'>OR</p>
          <div className='bg-gray-700 w-2/5 h-[1px]' />
        </div>
        <button className="flex items-center gap-2 text-xs font-semibold text-blue-500 hover:text-white mt-7">
          <FaFacebook className='text-2xl text-blue-400' />
          Login with Facebook
        </button>
        <button className='text-xs mt-5'>Forgot password?</button>
      </div>
      <div className='w-[350px] h-[60px] bg-black border border-gray-700 flex items-center mt-3 justify-center'>
        <p className='text-xs text-gray-100'>Don't have an account?</p>
        <button
          className='text-xs text-blue-500 font-semibold ms-1'
          onClick={() => navigate('/user/register')}>
          Sign up
        </button>
      </div>
      <div className='w-[350px] h-[60px]'>
        <p className='text-xs text-gray-200 mt-4 text-center'>Get the app.</p>
        <div className='flex items-center mt-3 justify-center'>
          <img src={playstore} className='w-[150px]' alt="playstore" />
          <img src={windows} alt="windows" className='w-[110px]' />
        </div>
      </div>
    </>
  );
};

export default Login;
