import { NavLink } from "react-router-dom";
import { GoHome } from 'react-icons/go';
import { GoHomeFill } from "react-icons/go";

function HomeButton(): JSX.Element {
  return (
    <NavLink
      to={'/'}
      className={({ isActive }) =>
        `flex py-2 px-1 hover:bg-gray-700 rounded-lg group items-center gap-3 mt-5 ${
          isActive ? 'font-semibold' : ''
        }`
      }
    >
      {({ isActive }) =>
        isActive ? (
          <>
            <GoHomeFill className="text-3xl" />
            <span className="hidden lg:block">Home</span>
          </>
        ) : (
          <>
            <GoHome className="text-3xl" />
            <span className="hidden lg:block">Home</span>
          </>
        )
      }
    </NavLink>
  );
}

export default HomeButton;
