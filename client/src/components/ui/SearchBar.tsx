import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import { User } from "../../utilities/interfaces";
import axiosErrorManager from "../../utilities/axiosErrorManager";

interface SearchBarProps {
  onSearchResults: (results: User[]) => void;
}

function SearchBar({ onSearchResults }: SearchBarProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`user/get_users/${searchQuery}`);
      onSearchResults(response.data);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  return (
    <div>
      <p className="text-lg pb-5 border-b border-gray-600">Search</p>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="w-full p-2 focus:outline-none text-xs text-white bg-gray-700 rounded-md my-3"
      />
    </div>
  );
}

export default SearchBar;
