import { User } from "../utilities/interfaces"


interface SuggestedUsersProps {
  user: User;
  message: string;
  but:string;
}
function SuggestedUsers({ user,message,but }: SuggestedUsersProps) {
  return (
    <div className="h-[100px] flex items-center justify-between w-[300px]">
        <div className="flex items-center gap-4">
      <img src={user.profile} alt={user.username} className="w-11 h-11 rounded-full" />
      <div className="text-xs">
        <p>{user.username}</p>
        <p className="text-gray-400">{message}</p>
      </div>
        </div>
        <button className="text-blue-400 text-xs">{but}</button>
    </div>
  )
}

export default SuggestedUsers
