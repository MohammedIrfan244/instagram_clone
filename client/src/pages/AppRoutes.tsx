import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage';
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import HomePage from './HomePage';
import Navbar from '../components/Navbar.tsx';

function AppRoutes(): JSX.Element {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const location = useLocation();

  const hideNavbarRoutes = currentUser ? ["/user/login", "/user/register"] : ["/user/login", "/user/register", "/"];

  return (
    <>
      
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={currentUser?<HomePage/>:<LandingPage/>} />
        <Route path="/user/register" element={<RegisterPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path='/:username' element={<h1>Profile</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
