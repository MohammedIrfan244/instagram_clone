import { RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import CurrenUserProfile from "../components/CurrenUserProfile"
import UserProfile from "../components/UserProfile"




function  ProfilePage(): JSX.Element {
  const {username}=useParams()
  const {currentUser}=useSelector((state:RootState)=>state.currentUser)
   return (
      <div className=" ps-[250px] ">
        {username===currentUser?.username?<CurrenUserProfile/>:<UserProfile/>}
      </div>
   )
}

export default ProfilePage
