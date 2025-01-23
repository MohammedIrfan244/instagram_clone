import { FaBars } from "react-icons/fa";

function MoreButton({ onClick }: { onClick: () => void }): JSX.Element {
  return (
    <button
      className="flex py-2 px-1 hover:bg-gray-700 rounded-lg group items-center gap-3 sm:mt-5"
      onClick={onClick}
    >
      <FaBars className="text-2xl" />
      <span className="hidden lg:block">More</span>
    </button>
  );
}

export default MoreButton;
