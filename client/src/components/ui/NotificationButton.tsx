import { NavLink } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

function NotificationButton(): JSX.Element {
  return (
    <NavLink
      to={'/account/notification'}
      className={({ isActive }) =>
        `flex py-2 px-1 hover:bg-gray-700 rounded-lg group items-center gap-3 ${
          isActive ? 'font-semibold' : ''
        }`
      }
    >
      {({ isActive }) =>
        isActive ? (
          <>
            <IoMdHeart className="text-3xl" />
            <span className="hidden lg:block">Notification</span>
          </>
        ) : (
          <>
            <IoMdHeartEmpty className="text-3xl" />
            <span className="hidden lg:block">Notification</span>
          </>
        )
      }
    </NavLink>
  );
}

export default NotificationButton;
