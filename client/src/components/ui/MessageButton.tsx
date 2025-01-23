import { NavLink } from "react-router-dom";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function MessageButton(): JSX.Element {
  const { messageUnreadCount } = useSelector((state: RootState) => state.notification);
  return (
    <NavLink
      to={'/direct/inbox'}
      className={({ isActive }) =>
        `flex relative py-2 px-1 hover:bg-gray-700 rounded-lg group items-center gap-3 ${
          isActive ? 'font-semibold' : ''
        }`
      }
    >
      {({ isActive }) =>
        isActive ? (
          <>
            <RiMessengerFill className="text-3xl" />
            <span className="hidden lg:block">Message</span>
          </>
        ) : (
          <>
            <RiMessengerLine className="text-3xl" />
            <span className="hidden lg:block">Message</span>
            {messageUnreadCount > 0 && (
            <span className="absolute top-1 left-5 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {messageUnreadCount > 9 ? '9+' : messageUnreadCount}
            </span>
          )}
          </>
        )
      }
    </NavLink>
  );
}

export default MessageButton;
