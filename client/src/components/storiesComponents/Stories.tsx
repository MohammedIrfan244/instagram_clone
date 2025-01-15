import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useEffect, useRef, useState } from 'react';
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import axiosInstance from '../../utilities/axiosInstance';
import axiosErrorManager from '../../utilities/axiosErrorManager';
import instaBackground from '../../assets/instaBackground.jpg';
import ReactInstaStories from "react-insta-stories";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IoMdClose } from "react-icons/io";
import { FaRegHeart,FaHeart } from "react-icons/fa";
import { PiPaperPlaneTilt } from "react-icons/pi";

interface Story {
  _id: string;
  user: {
    _id: string;
    username: string;
    profile: string;
  };
  hasSeen: boolean;
  media: [
    {
      url:string,
      header:{
          heading:string,
          subheading:string,
          profileImage:string
      },
    }];
    seenBy: string[]
}

function Stories(): JSX.Element {
  const [stories, setStories] = useState<Story[]>([]);
  const [story, setStory] = useState<Story | null>(null);
  const [showStory, setShowStory] = useState<boolean>(false);
  const [isLiked,setIsLiked]=useState<boolean>(false)
  const {storyDetailsPopup}=useSelector((state: RootState) => state.common);
  const {currentUser}=useSelector((state:RootState)=>state.currentUser)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);
  console.log(storyDetailsPopup)
  const fetchStories = async (): Promise<void> => {
    try {
      const response = await axiosInstance('/user/story/get_follow_user_story');
      setStories(response.data.stories);
    } catch (error) {
      console.error(axiosErrorManager(error));
    }
  };

  const handleClick = async (id: string) => {
    try {
      await axiosInstance.post(`/user/story/seen_story/${id}`);
      const response = await axiosInstance.get(`/user/story/get_one_story/${id}`);
      setStory({
        ...response.data.story,
        media: response.data.story.media.map((mediaItem: { url: string }) => ({
          ...mediaItem,
          type: /\.(mp4|webm|ogg)$/i.test(mediaItem.url) ? 'video' : 'image',
        })),
      });
      setIsLiked(response.data.isLiked)
    } catch (error) {
      console.log(axiosErrorManager(error));
    } finally {
      setShowStory(true);
      fetchStories();
    }
  };

  const likeStory=async(id:string)=>{
    try {
      await axiosInstance.post(`/user/story/like_story/${id}`);
      setIsLiked(!isLiked)
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  }

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div className="w-screen lg:w-full lg:mx-10 h-auto relative">
      <button
        className={`absolute left-0 ps-5 top-1/2 transform -translate-y-1/2 text-white text-xl z-10 ${stories.length < 8 ? 'hidden' : ''}`}
        onClick={() => swiperRef.current?.swiper.slidePrev()}
      >
        <FaCircleChevronLeft />
      </button>

      <Swiper
        ref={swiperRef}
        spaceBetween={2}
        breakpoints={{
          320: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 8,
          },
        }}
      >
        {stories.map((story, index) => (
          <SwiperSlide onClick={() => handleClick(story._id)} key={String(index) + story._id} id={story._id}>
            <div className="flex flex-col items-center gap-2 h-[120px] justify-center hover:cursor-pointer">
              <div
                className="relative w-[60px] h-[60px] mt-2 p-[1px] rounded-full"
                style={{
                  border: story.hasSeen ? '1px solid grey' : '1px solid transparent',
                  backgroundImage: story.hasSeen ? 'none' : `url(${instaBackground})`,
                }}
              >
                <div
                  className="relative w-full h-full p-[2px] bg-black rounded-full"
                >
                  <img
                    src={story.user.profile}
                    alt={`${story.user.username}'s story`}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>

              <p className="text-gray-400 text-xs">{story.user.username}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className={`absolute right-0 top-1/2 transform -translate-y-1/2 pe-5 text-white text-xl z-10 ${stories.length < 8 ? 'hidden' : ''}`}
        onClick={() => swiperRef.current?.swiper.slideNext()}
      >
        <FaCircleChevronRight />
      </button>

      {showStory && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80`}>
          <button
            onClick={() => setShowStory(false)}
            className="absolute right-3 top-3 text-white text-lg"
          >
            <IoMdClose />
          </button>
          {story && story.media && story.media.length > 0 && (
            <div className='w-auto h-auto relative bg-black rounded-xl'>
              <ReactInstaStories
                stories={story.media}
                defaultInterval={3000}
                width={350}
                height={550}
                storyContainerStyles={{borderRadius: '10px',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',margin: 'auto', overflow: 'hidden'}}
                onAllStoriesEnd={() => setShowStory(false)} 
                keyboardNavigation={true}
              />
              {
                story.user.username==currentUser?.username?(
                  <div className='flex justify-center items-center p-5 text-sm font-semibold'>
                    <p >Seen by {story.seenBy.length}</p>
                  </div>
                ):(
                  <div className=' w-full flex justify-between items-center p-5'>
              <input type="text" placeholder={`Replay to ${story.user.username}`} className='bg-transparent py-1 px-4 border-2 border-white text-white placeholder:text-sm rounded-3xl' />
              <button className='text-3xl' onClick={()=>likeStory(story._id)} >{isLiked ? <FaHeart/> : <FaRegHeart/>}</button>
              <button className='text-3xl'><PiPaperPlaneTilt/></button>
              </div>
                )
              }
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Stories;
