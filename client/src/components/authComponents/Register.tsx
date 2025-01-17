import { useNavigate } from "react-router-dom";
// import { AiFillFacebook } from "react-icons/ai";
import playstore from "../../assets/5a902dbf7f96951c82922875.png";
import windows from "../../assets/5a902db47f96951c82922873.png";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";
import axiosErrorManager from "../../utilities/axiosErrorManager";
import BlueButton from "../ui/BlueButton";
import InstaText from "../ui/InstaText";

interface FormValues {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  fullname: Yup.string().required("Full Name is required"),
  username: Yup.string()
    .required("Username is required")
    .matches(/^[a-z_]*$/, "Username can only contain lowercase letters and underscores")
    .matches(/^\S*$/, "Username cannot contain spaces"),
});

function Register(): JSX.Element {
  const initialValues: FormValues = { email: "", password: "", fullname: "", username: "" };
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [otpStep, setOtpStep] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleRegister = async (values: FormValues) => {
    try {
      setLoading(true);
      setError(null);
       await axios.post(`${import.meta.env.VITE_API_URL}/auth/send_otp`, { email: values.email, username: values.username });
      
      setLoading(false);
      setOtpStep(true); 
      setFormData(values);
    } catch (error) {
      setError(axiosErrorManager(error));
      setLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (!formData) return;
    try {
      setLoading(true);
      setError(null);
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/verify_otp`, {...formData, otp});
      
      setLoading(false);
      navigate("/user/login");
    } catch (error) {
      setError(axiosErrorManager(error));
      setLoading(false);
    }
  };

  return (
    <div className="w-[350px] h-auto">
      <div className="border border-gray-700 w-full flex flex-col items-center px-10">
        <InstaText styles="w-[190px] overflow-hidden mt-5"/>
        <p className="text-gray-300 font-semibold text-sm text-center">
          Sign up to see photos and videos from your friends.
        </p>
        {otpStep ? (
          <div className="w-full flex flex-col items-center">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-7"
            />
            <BlueButton styles="focus:outline-none flex items-center text-xs font-semibold mb-2 gap-2 w-full justify-center mt-3 py-2 rounded-lg" text="Submit OTP" onClick={handleOTPSubmit} loading={loading} />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={(values) => handleRegister(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-7"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500 text-xs">{errors.email}</div>
                ) : null}
                <div className="relative w-full">
                  <Field
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-3 text-gray-400 text-xs font-semibold focus:outline-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && touched.password ? (
                  <div className="text-red-500 text-xs">{errors.password}</div>
                ) : null}
                <Field
                  name="fullname"
                  type="text"
                  placeholder="Full Name"
                  className="bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-2"
                />
                {errors.fullname && touched.fullname ? (
                  <div className="text-red-500 text-xs">{errors.fullname}</div>
                ) : null}
                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="bg-[#121212] text-xs px-2 focus:outline-none border-[1px] border-gray-700 w-full h-9 mt-2"
                />
                {errors.username && touched.username ? (
                  <div className="text-red-500 text-xs">{errors.username}</div>
                ) : null}
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                <p className="text-gray-400 text-[11px] mt-2 text-center">
                  People who use our service may have uploaded your contact
                  information to Instagram.
                </p>
                <p className="text-gray-400 text-[11px] mt-2 text-center">
                  By sighning up, you agree to our Terms and Conditions
                </p>
                <BlueButton styles="focus:outline-none flex items-center gap-2 w-full justify-center text-sm font-semibold   mb-10 mt-3 py-2 rounded-lg" text="Sign up" onClick={() => {}} loading={loading} />
              </Form>
            )}
          </Formik>
        )}
      </div>
      <div className="w-full h-[60px] bg-black border border-gray-700 flex items-center mt-3 justify-center">
        <p className="text-xs text-gray-100">Already have an account ?</p>
        <button
          className="text-xs text-blue-500 font-semibold ms-1"
          onClick={() => navigate("/user/login")}
        >
          Log in
        </button>
      </div>
      <div className="w-[350px] h-[60px]">
        <p className="text-xs text-gray-200 mt-4 text-center">Get the app.</p>
        <div className="flex items-center mt-3 justify-center">
          <img src={playstore} className="w-[150px]" alt="playstore" />
          <img src={windows} alt="windows" className="w-[110px]" />
        </div>
      </div>
    </div>
  );
}

export default Register;
