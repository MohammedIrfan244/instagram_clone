import { useNavigate } from "react-router-dom"
import instagram from '../assets/instagram_text.png'
import { AiFillFacebook } from "react-icons/ai";
import playstore from '../assets/5a902dbf7f96951c82922875.png'
import windows from '../assets/5a902db47f96951c82922873.png'
import { Form, Field, Formik } from 'formik'
import * as Yup from 'yup'
import { useState } from "react";
import axios from "axios";


interface FormValues {
  email: string,
  password: string,
  fullname: string,
  username: string
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  fullname: Yup.string().required('Full Name is required'),
  username: Yup.string().required('Username is required').matches(/^\S*$/, 'Username cannot contain spaces')
})

function Register(): JSX.Element {
  const initialValues: FormValues = { email: '', password: '', fullname: '', username: '' }
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)


  const handleRegister = async (values: FormValues) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.post("http://localhost:3000/api/auth/register", values, {
        withCredentials: true
      })
      console.log(response.data)
      setLoading(false)
      navigate('/user/login')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data)
        setError(error.response?.data?.message)
      } else {
        console.log(error)
      }
      setLoading(false)
    }
  }
  return (
    <div className='w-[350px] h-auto'>
      <div className="border border-gray-700 w-full flex flex-col items-center px-10">
        <div className='w-[190px] overflow-hidden mt-5'>
          <img src={instagram} alt="instagram" />
        </div>
        <p className="text-gray-300 font-semibold text-sm text-center">Sign up to see photos and videos from your friends.</p>
        <button className="bg-blue-500 focus:outline-none flex items-center gap-2 w-full justify-center mt-3 py-1.5 rounded-lg hover:bg-blue-600"><AiFillFacebook className='text-xl' /><p className='text-xs font-semibold'>Login with Facebook</p></button>
        <div className='flex items-center w-full h-auto justify-center gap-4 mt-7'>
          <div className='bg-gray-700 w-2/5 h-[1px]' />
          <p className='text-gray-400 text-xs font-semibold'>OR</p>
          <div className='bg-gray-700 w-2/5 h-[1px]' />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            handleRegister(values)
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name='email' type='email' placeholder='Email' className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-7' />
              {errors.email && touched.email ? <div className='text-red-500 text-xs'>{errors.email}</div> : null}
              <Field name='password' type='password' placeholder='Password' className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-2' />
              {errors.password && touched.password ? <div className='text-red-500 text-xs'>{errors.password}</div> : null}
              <Field name='fullname' type='text' placeholder='Full Name' className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-2' />
              {errors.fullname && touched.fullname ? <div className='text-red-500 text-xs'>{errors.fullname}</div> : null}
              <Field name='username' type='text' placeholder='Username' className='bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-2' />
              {errors.username && touched.username ? <div className='text-red-500 text-xs'>{errors.username}</div> : null}
              <p className='text-[11px] text-gray-300 mt-3 text-center'>People who use our service may have uploaded your contact information to Instagram. <span className='text-white hover:cursor-pointer'> Learn More</span></p>
              <p className='text-gray-300 text-[11px] mt-2 text-center'>By signing up, you agree to our <span className='text-white hover:cursor-pointer'> Terms , Privacy Policy and Cookies Policy .</span></p>
              <button type='submit' className='bg-blue-700 hover:bg-blue-500 mb-10 w-full h-8 mt-4 rounded-lg text-xs font-semibold'>{loading?"Signing up":"Sign up"}</button>
            </Form>
          )}
        </Formik>
        {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
      </div>
      <div className='w-full h-[60px] bg-black border border-gray-700 flex items-center mt-3 justify-center'>
        <p className='text-xs text-gray-100'>Already have an account ?</p>
        <button className='text-xs text-blue-500 font-semibold ms-1' onClick={() => navigate('/user/login')}>Log in</button>
      </div>
      <div className='w-[350px] h-[60px]'>
        <p className='text-xs text-gray-200 mt-4 text-center'>Get the app.</p>
        <div className='flex items-center mt-3 justify-center'>
          <img src={playstore} className='w-[150px]' alt="playstore" />
          <img src={windows} alt="windows" className='w-[110px]' />
        </div>
      </div>
    </div>
  )
}

export default Register
