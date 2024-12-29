import { RootState } from "../redux/store"
import { useDispatch, useSelector } from "react-redux"
import ProfilePicture from "../modals/ProfilePicture"
import { openProfileModal } from "../redux/commonSlice"

function CurrenUserProfile():JSX.Element {
    const dispatch=useDispatch()
    const {currentUser}=useSelector((state:RootState)=>state.currentUser)
    const {profileModal}=useSelector((state:RootState)=>state.common)
    
  return (
    <div className="flex flex-col justify-center h-auto mt-5 items-center">
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden hover:cursor-pointer">
      <img src={currentUser?.profile} alt="profile" onClick={()=>dispatch(openProfileModal())} />
      </div>
      <p>{currentUser?.username}</p>
      <button>Edit Profile</button>
      <button>View Archive</button>
      <button>Settings</button>
      <p>Posts</p>
      <p>Followers</p>
      <p>Following</p>
      <p>{currentUser?.fullname}</p>
      <p>{currentUser?.bio}</p>
      {profileModal && <ProfilePicture/>}
    </div>
  )
}

export default CurrenUserProfile
