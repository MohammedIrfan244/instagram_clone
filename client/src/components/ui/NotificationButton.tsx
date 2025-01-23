import { NavLink } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";

function NotificationButton(): JSX.Element {
  const { unreadCount } = useSelector((state: RootState) => state.notification);

  return (
    <NavLink
      to={'/account/notification'}
      className={({ isActive }) =>
        `flex py-2 px-1 hover:bg-gray-700 rounded-lg group items-center gap-3 relative ${
          isActive ? 'font-semibold' : ''
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <IoMdHeart className="text-3xl" />
          ) : (
            <IoMdHeartEmpty className="text-3xl" />
          )}
          <span className="hidden lg:block">Notification</span>
          {unreadCount > 0 && (
            <span className="absolute top-1 left-5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default NotificationButton;