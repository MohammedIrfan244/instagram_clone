import { NavLink } from "react-router-dom";
import { RiMessengerFill, RiMessengerLine } from "react-icons/ri";

function MessageButton(): JSX.Element {
  return (
    <NavLink
      to={'/accout/message'}
      className={({ isActive }) =>
        `flex py-2 px-1 hover:bg-gray-700 rounded-lg group items-center gap-3 ${
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
          </>
        )
      }
    </NavLink>
  );
}

export default MessageButton;
