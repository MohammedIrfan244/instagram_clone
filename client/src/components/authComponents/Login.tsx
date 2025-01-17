import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { FaFacebook } from "react-icons/fa";
import playstore from '../../assets/5a902dbf7f96951c82922875.png';
import windows from '../../assets/5a902db47f96951c82922873.png';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../redux/userSlice';
import axiosErrorManager from '../../utilities/axiosErrorManager';
import BlueButton from '../ui/BlueButton';
import InstaText from '../ui/InstaText';

interface LoginData {
  identity: string;
  password: string;
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>({
    identity: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, loginData, {
        withCredentials: true,
      });
      localStorage.setItem('user', JSON.stringify(response.data.userDetail));
      localStorage.setItem('accessToken', response.data.accessToken);
      dispatch(setCurrentUser(response.data.userDetail));
      setLoginData({ identity: '', password: '' });
      navigate('/');
    } catch (error) {
      console.log(axiosErrorManager(error));
      setError(axiosErrorManager(error)); 
    } finally {
      setLoading(false); 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div className="bg-black w-[350px] h-[415px] border border-gray-700 flex flex-col items-center px-10 pt-7">
        <InstaText styles='w-[190px] overflow-hidden' />
        <form className='w-full mt-[50px]' onSubmit={handleLogin}>
          <input
            type="text"
            name="identity"
            value={loginData.identity}
            onChange={handleInputChange}
            className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-7'
            placeholder='Username or Email'
            required
          />
          <div className='relative'>
            <input
              type={passwordVisible ? 'text' : 'password'}
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-2'
              placeholder='Password'
              required
            />
            <button
              type="button"
              className="absolute right-2 top-4 text-xs text-white"
              onClick={() => setPasswordVisible((prev) => !prev)}
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
            >
              {passwordVisible ? 'Hide' : 'Show'}
            </button>
          </div>
          {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
          {/* <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-600 w-full h-8 mt-4 rounded-lg text-xs font-semibold'
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button> */}
          <BlueButton styles="w-full h-8 mt-2 rounded-lg text-xs font-semibold" text="Log In" loading={loading} onClick={() => handleLogin} />
        </form>
        {/* <div className='flex items-center w-full h-auto justify-center gap-4 mt-7'>
          <div className='bg-gray-700 w-2/5 h-[1px]' />
          <p className='text-gray-400 text-xs font-semibold'>OR</p>
          <div className='bg-gray-700 w-2/5 h-[1px]' />
        </div> */}
        {/* <button className="flex items-center gap-2 text-xs font-semibold text-blue-500 hover:text-white mt-7">
          <FaFacebook className='text-2xl text-blue-400' />
          Login with Facebook
        </button> */}
      </div>
      <div className='w-[350px] h-[60px] bg-black border border-gray-700 flex items-center mt-3 justify-center'>
        <p className='text-xs text-gray-100'>Don't have an account?</p>
        <button
          className='text-xs text-blue-500 font-bold ms-1'
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
}

export default Login;
