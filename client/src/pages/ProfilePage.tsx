import { useParams } from "react-router-dom"


function ProfilePage() {
    const {username}=useParams()
  return (
    <div className="flex flex-col justify-center h-auto mt-5 ps-[250px] items-center">
      <p>{username}</p>
    </div>
  )
}

export default ProfilePage
