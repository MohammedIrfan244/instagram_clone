import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Stroy } from '../utilities/interfaces';
import { useRef } from 'react';
import { FaCircleChevronLeft ,FaCircleChevronRight} from "react-icons/fa6";

const stories: Stroy[] = [
  {
    id: '1',
    username: 'john_doe',
    thumbnail: 'https://i.pinimg.com/736x/b0/3a/26/b03a26e167ba0099af4e5b5eab93e1e9.jpg',
    media: 'test',
  },
  {
    id: '2',
    username: 'isabella',
    thumbnail: 'https://i.pinimg.com/736x/b0/3a/26/b03a26e167ba0099af4e5b5eab93e1e9.jpg',
    media: 'test',
  },
  {
    id: '3',
    username: 'jack_doe',
    thumbnail: 'https://i.pinimg.com/736x/b0/3a/26/b03a26e167ba0099af4e5b5eab93e1e9.jpg',
    media: 'test',
  },
  {
    id: '4',
    username: 'jane_doe',
    thumbnail: 'https://i.pinimg.com/736x/b0/3a/26/b03a26e167ba0099af4e5b5eab93e1e9.jpg',
    media: 'test',
  },
  {
    id: '5',
    username: 'susan_doe',
    thumbnail: 'https://i.pinimg.com/736x/b0 /3a/26/b03a26e167ba0099af4e5b5eab93e1e9.jpg',
    media: 'test',
  },
  {
    id: '6',
    username: 'mary_doe',
    thumbnail: 'https://i.pinimg.com/736x/b0/3a/26/b03a26e167ba0099af4e5b5eab93e1e9.jpg',
    media: 'test',
  },
  {
    id: '7',
    username: 'zack_doe',
    thumbnail: 'https://i.pinimg.com/736x/b0/3a/26/b03a26e167ba0099af4e5b5eab93e1e9.jpg',
    media: 'test',
  },
  {
    id: '8',
    username: 'olivia_doe',
    thumbnail: 'https://i.pinimg.com/736x/b0/3a/26/b03a26e167ba0099af4e5b5eab93e1e9.jpg',
    media: 'test',
  },
];

function Stories(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  return (
    <div className="w-full px-3 h-auto relative">
      <button className="absolute left-0 ps-5 top-1/2 transform -translate-y-1/2 text-white text-xl z-10" onClick={() => swiperRef.current?.swiper.slidePrev()}
      >
        <FaCircleChevronLeft />
      </button>

      <Swiper
        ref={swiperRef}
        spaceBetween={2}
        slidesPerView={7}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {stories.map((story) => (
          <SwiperSlide key={story.id}>
            <div className="flex flex-col items-center gap-2 h-[120px] justify-center">
              <div className="relative w-14 h-14 mt-2 border border-gray-600 p-[2px] rounded-full">
                <img
                  src={story.thumbnail}
                  alt={`${story.username}'s story`}
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <p className="text-gray-400 text-xs">{story.username}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 pe-5 text-white text-xl z-10"
        onClick={() => swiperRef.current?.swiper.slideNext()}
      >
        <FaCircleChevronRight />
      </button>
    </div>
  );
}

export default Stories;
