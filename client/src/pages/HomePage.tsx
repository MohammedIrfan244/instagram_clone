import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Stories from '../components/storiesComponents/Stories';
import SuggestedUsers from '../shared/SuggestedUsers';
import { User } from '../utilities/interfaces';
import { useEffect, useState } from 'react';
import axiosInstance from '../utilities/axiosInstance';
import axiosErrorManager from '../utilities/axiosErrorManager';
import HomeGrid from '../components/PostComponents/HomeGrid';



function HomePage(): JSX.Element {
  const { currentUser } = useSelector((state: RootState) => state.currentUser)
  const [suggestedUsers,setSuggestedUsers]=useState<User[]>([])
  const [loading,setLoading]=useState<boolean>(false)

  const getSuggestedUsers=async():Promise<void>=>{
    setLoading(true)
    try{
      const response=await axiosInstance.get('/user/suggested_users')
      setSuggestedUsers(response.data.suggestedUsers)
      setLoading(false)
    }catch(error){
      console.log(axiosErrorManager(error))
      setLoading(false)
    }
  }
  useEffect(()=>{
    if(currentUser){
      getSuggestedUsers()
    }
  },[currentUser])
  return (
    <div className="flex w-screen lg:w-full min-h-screen">
      {/* posts and stories*/}
      <div className='lg:w-2/3 w-screen lg:ps-[250px]  min-h-screen'>
      {/* This is the area for stories */}
      <div className='w-full mt-12 lg:mt-0 h-auto'>
        <Stories/>
      </div>
      {/*area for posts */}
      <div className='flex flex-col items-center'>
      <HomeGrid/>
      </div>
      </div>
      {/* area for the suggestions */}
        <div className='w-1/3 hidden lg:flex items-center flex-col'>
          <div className='w-[300px]'>
            <div className='my-7'>
          {currentUser && <SuggestedUsers loading={loading} user={currentUser} but={"Switch"} message={currentUser?.fullname || ''}/>}
            </div>
          <p className='text-sm mb-5 font-semibold text-gray-400'>Suggested for you</p>
          {suggestedUsers.length===0?<p className='text-sm text-gray-400 hidden lg:block'>No suggested users</p>:suggestedUsers.map(user=>(<SuggestedUsers loading={loading} key={user._id} user={user} but={"View"} message={user?.fullname || ''}/>))}
          </div>
        </div>
    </div>
  )
}

export default HomePage
