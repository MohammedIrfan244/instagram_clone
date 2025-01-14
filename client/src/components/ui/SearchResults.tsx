import { User } from "../../utilities/interfaces";
import { useNavigate } from "react-router-dom";

interface SearchResultsProps {
  results: User[];
  onResultClick: (username: string) => void;
}

function SearchResults({ results, onResultClick }: SearchResultsProps): JSX.Element {
  const navigate = useNavigate();

  const handleResultClick = (username: string) => {
    onResultClick(username);
    navigate(`/${username}`);
  };

  return (
    <div>
      {results.length > 0 ? (
        results.map((user, index) => (
          <div key={index} className="py-2">
            <div
              onClick={() => handleResultClick(user.username)}
              className="flex hover:cursor-pointer gap-5 items-center"
            >
              <img
                src={user.profile}
                alt="Profile"
                className="object-cover w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-xs text-white">{user.username}</p>
                <p className="text-xs text-white">{user.fullname}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No results to show...</p>
      )}
    </div>
  );
}

export default SearchResults;
