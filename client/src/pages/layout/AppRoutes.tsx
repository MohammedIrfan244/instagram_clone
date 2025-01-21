import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import LandingPage from '../authPages/LandingPage';
import RegisterPage from '../authPages/RegisterPage';
import LoginPage from '../authPages/LoginPage';
import HomePage from '../HomePage';
import Navbar from '../../components/ui/Navbar';
import ProfilePage from '../userPages/ProfilePage';
import EditPage from '../userPages/EditPage';
import FeedPage from '../PostPages/FeedPage'
import ReelPage from '../PostPages/ReelPage';
import PostDetailPage from '../PostPages/PostDetailPage';
import ArchivesPage from '../userPages/ActivityPage';
import ChatPage from '../userPages/ChatPage';
import DmPage from '../userPages/DmPage';

function AppRoutes(): JSX.Element {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const location = useLocation();

  // Define the routes where the Navbar should be hidden
  const hideNavbarRoutes: string[] = currentUser
    ? ['/user/login', '/user/register']
    : ['/user/login', '/user/register', '/'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={currentUser ? <HomePage /> : <LandingPage />} />
        <Route path="/user/register" element={<RegisterPage />} />
        <Route path="/user/login" element={<LoginPage />} />
        <Route path="/:username" element={<ProfilePage/>} />
        <Route path='/account/edit' element={currentUser?<EditPage/>:<LandingPage/>} />
        <Route path='/direct/inbox' element={currentUser?<ChatPage/>:<LandingPage/>}/>
        <Route path='/direct/t/:id' element={currentUser?<DmPage/>:<LandingPage/>}/>
        <Route path='/explore/_feed' element={<FeedPage/>}/>
        <Route path='/feed/reels' element={<ReelPage/>} />
        <Route path='/feed/post/:id' element={<PostDetailPage/>} />
        <Route path='/account/activity'element={currentUser?<ArchivesPage/>:<LandingPage/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
