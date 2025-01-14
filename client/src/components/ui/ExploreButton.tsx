import { NavLink } from "react-router-dom";
import { MdExplore, MdOutlineExplore } from "react-icons/md";

function ExploreButton(): JSX.Element {
  return (
    <NavLink
      to={'/explore/_feed'}
      className={({ isActive }) =>
        `flex py-2 px-1 hover:bg-gray-700 rounded-lg group items-center gap-3 ${
          isActive ? 'font-semibold' : ''
        }`
      }
    >
      {({ isActive }) =>
        isActive ? (
          <>
            <MdExplore className="text-3xl" />
            <span className="hidden lg:block">Explore</span>
          </>
        ) : (
          <>
            <MdOutlineExplore className="text-3xl" />
            <span className="hidden lg:block">Explore</span>
          </>
        )
      }
    </NavLink>
  );
}

export default ExploreButton;
