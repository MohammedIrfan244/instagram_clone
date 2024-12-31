import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Stories from '../components/Stories';
import SuggestedUsers from '../shared/SuggestedUsers';
import { User } from '../utilities/interfaces';
import { useEffect, useState } from 'react';
import axiosInstance from '../utilities/axiosInstance';
import axiosErrorManager from '../utilities/axiosErrorManager';



function HomePage(): JSX.Element {
  const { currentUser } = useSelector((state: RootState) => state.currentUser)
  const [suggestedUsers,setSuggestedUsers]=useState<User[]>([])

  const getSuggestedUsers=async():Promise<void>=>{
    try{
      const response=await axiosInstance.get('/user/suggested_users')
      setSuggestedUsers(response.data.suggestedUsers)
    }catch(error){
      console.log(axiosErrorManager(error))
    }
  }
  useEffect(()=>{
    if(currentUser){
      getSuggestedUsers()
    }
  },[currentUser])
  return (
    <div className="flex w-full min-h-screen">
       
      {/* This is the main content for posts and stories*/}
      <div className='w-2/3 ps-[250px]  min-h-screen'>
      {/* This is the area for stories */}
      <div className='w-full h-auto'>
        <Stories/>
      </div>
      {/* This is the area for posts */}
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        NO POSTS YET
      </div>
      </div>
      {/* This is the area for the suggestions */}
        <div className='w-1/3 flex items-center flex-col'>
          <div className='w-[300px]'>
            <div className='my-7'>
          {currentUser && <SuggestedUsers user={currentUser} but={"Switch"} message={currentUser?.fullname || ''}/>}
            </div>
          <p className='text-sm mb-5 font-semibold text-gray-400'>Suggested for you</p>
          {suggestedUsers.length===0?<p className='text-sm text-gray-400'>No suggested users</p>:suggestedUsers.map(user=>(<SuggestedUsers key={user._id} user={user} but={"View"} message={user?.fullname || ''}/>))}
          </div>
        </div>
    </div>
  )
}

export default HomePage
