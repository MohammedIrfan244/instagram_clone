import { RootState } from "../../redux/store"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import CurrenUserProfile from "../../components/profilesComponents/CurrenUserProfile"
import UserProfile from "../../components/profilesComponents/UserProfile"




function  ProfilePage(): JSX.Element {
  const {username}=useParams()
  const {currentUser}=useSelector((state:RootState)=>state.currentUser)
   return (
      <div className="lg:ps-[250px] ">
        {username===currentUser?.username?<CurrenUserProfile/>:<UserProfile/>}
      </div>
   )
}

export default ProfilePage