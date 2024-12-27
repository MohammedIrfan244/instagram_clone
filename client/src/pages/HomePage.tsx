import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Stories from '../components/Stories';
import SuggestedUsers from '../shared/SuggestedUsers';



function HomePage(): JSX.Element {
  const { currentUser } = useSelector((state: RootState) => state.currentUser)
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
        <div className='flex-grow flex items-center flex-col'>
          <div className='w-[300px]'>
          {currentUser && <SuggestedUsers user={currentUser} but={"Switch"} message={currentUser?.fullname || ''}/>}
          <p className='text-sm font-semibold text-gray-400'>Suggested for you</p>
          <p className='text-xs text-gray-400 mt-10'>No suggestions</p>
          </div>
        </div>
    </div>
  )
}

export default HomePage
