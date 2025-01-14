import { FiSearch } from 'react-icons/fi';

function SearchButton({ searchClick }: { searchClick: () => void }) {
    return (
        <button
            className="flex py-2 px-1 hover:bg-gray-700 rounded-lg  items-center gap-3"
            onClick={searchClick}
        >
            <FiSearch className="text-3xl" />
            <span className='hidden lg:block'>Search</span>
        </button>
    )
}

export default SearchButton
