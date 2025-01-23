import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import NotificationPage from '../NotificationPage';
import { socket } from '../../hooks/useConnectSocket';
import { addMessageNotification, addNotification, setNotifications } from '../../redux/notificationSlice';
import { useEffect } from 'react';
import axiosInstance from '../../utilities/axiosInstance';
import axiosErrorManager from '../../utilities/axiosErrorManager';


interface Notification {
  _id: string;
  type: string;
  read: boolean;
  sender: {
      _id: string;
      profile: string;
      username: string;
      fullname: string;
  };
  createdAt: string;
}

function AppRoutes(): JSX.Element {
  const { currentUser } = useSelector((state: RootState) => state.currentUser);
  const location = useLocation();
  const dispatch=useDispatch()

 useEffect(() => {
  // Fetch notifications
  const fetchNotifications = async () => {
    try {
        const notiResponse = await axiosInstance.get('/notification/notifications');
        dispatch(setNotifications(notiResponse.data.notifications));
    } catch (error) {
        console.log(axiosErrorManager(error))
    }
};

fetchNotifications();
  socket.on('newNotification', (notification: Notification) => {
    console.log('newNotification', notification);
    if(notification.type==='message'){
      dispatch(addMessageNotification());
    }else{
      dispatch(addNotification(notification));
    }
    return () => {
      socket.off('newNotification');
  };
});
 }, [dispatch]);
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
        <Route path='/direct/t/:username' element={currentUser?<DmPage/>:<LandingPage/>}/>
        <Route path='/explore/_feed' element={<FeedPage/>}/>
        <Route path='/feed/reels' element={<ReelPage/>} />
        <Route path='/feed/post/:id' element={<PostDetailPage/>} />
        <Route path='/account/notification'element={<NotificationPage/>} />
        <Route path='/account/activity'element={currentUser?<ArchivesPage/>:<LandingPage/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default AppRoutes;
