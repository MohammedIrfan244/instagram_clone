import { useNavigate } from "react-router-dom";
import { User } from "../utilities/interfaces";

interface SuggestedUsersProps {
  user: User;
  message: string;
  but:string;
}
function SuggestedUsers({ user,message,but }: SuggestedUsersProps): JSX.Element {
const navigate=useNavigate()
  return (
    <div className="h-[50px] flex items-center justify-between w-[300px]">
        <div className="flex items-center gap-4 hover:cursor-pointer"  onClick={()=>navigate(`/${user.username}`)}>
      <img src={user.profile} alt={user.username} className="w-11 h-11 rounded-full" />
      <div className="text-xs">
        <p>{user.username}</p>
        <p className="text-gray-400">{message}</p>
      </div>
        </div>
        <button onClick={but==="View"?()=>navigate(`/${user.username}`):()=>{}} className="text-blue-400 text-xs">{but}</button>
    </div>
  )
}
  
export default SuggestedUsers
