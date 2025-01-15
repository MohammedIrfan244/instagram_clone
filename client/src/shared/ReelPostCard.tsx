

// ReelPostCard.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import ProfileCirc from "../components/ui/ProfileCirc";
import { SlOptions } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { MdOutlineBookmarkBorder, MdBookmark } from "react-icons/md";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";
import axiosInstance from "../utilities/axiosInstance";
import axiosErrorManager from "../utilities/axiosErrorManager";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openOptionsPopup } from "../redux/commonSlice";
import { useInView } from 'react-intersection-observer';

interface ReelPostCardProps {
  media: string;
  username: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  id: string;
  isAudioActive: boolean;  
  onAudioToggle: () => void;
  onInView: (isInView: boolean) => void;
}

function ReelPostCard({
  media,
  username,
  caption,
  likesCount,
  commentsCount,
  id,
  isAudioActive,
  onAudioToggle,
  onInView,
}: ReelPostCardProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likesCount);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ref: inViewRef } = useInView({
    threshold: 0.7, // 70% of the reel needs to be visible
    onChange: (inView) => {
      onInView(inView);
    },
  });

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isAudioActive;
    }
  }, [isAudioActive]);

  const setRefs = useCallback(
    (node: HTMLVideoElement | null) => {
      // ref for video element
      videoRef.current = node;
      // ref for intersection observer
      inViewRef(node);
    },
    [inViewRef]
  );

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const percentage =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage || 0);
    }
  };

  const likePost = async () => {
    try {
      const response = await axiosInstance.post(`/user/post/like_post/${id}`);
      setIsLiked(response.data.isLiked);
      setLikeCount((prev) => (response.data.isLiked ? prev + 1 : prev - 1));
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  const savePost = async () => {
    try {
      const response = await axiosInstance.post(`/user/post/save_post/${id}`);
      setIsSaved(response.data.isSaved);
    } catch (error) {
      console.log(axiosErrorManager(error));
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const [likeRes, saveRes] = await Promise.all([
          axiosInstance.get(`/user/post/is_liked/${id}`),
          axiosInstance.get(`/user/post/is_saved/${id}`),
        ]);
        setIsLiked(likeRes.data.isLiked);
        setIsSaved(saveRes.data.isSaved);
      } catch (error) {
        console.log(axiosErrorManager(error));
      }
    })();

    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", updateProgress);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [id]);

  return (
    <div className="lg:w-[400px] w-screen h-screen justify-between relative mb-20 lg:mb-0 lg:h-[600px] py-5 items-center flex">
      <div className="lg:w-[80%] lg:h-full h-[90%] w-full rounded-md overflow-hidden relative">
      <video
          ref={setRefs}
          src={media}
          autoPlay
          loop
          muted={!isAudioActive}
          className="w-full h-full object-contain cursor-pointer"
          onClick={togglePlayPause}
        ></video>

        <div className="absolute bottom-5 left-2 space-y-1 py-2">
          <div className="flex gap-2 items-center">
            <ProfileCirc username={username} />
            <p className="text-xs font-bold">{username}</p>
          </div>
          <p className="text-xs font-bold">{caption}</p>
        </div>

        <button
          onClick={onAudioToggle}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
        >
          {!isAudioActive ? <BiVolumeMute size={24} /> : <BiVolumeFull size={24} />}
        </button>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gray-100 transition-all"
          ></div>
        </div>
      </div>

      <div className="lg:w-[20%] absolute right-0 lg:static h-[90%] text-xl flex flex-col items-center justify-end gap-5">
        <div className="flex flex-col items-center gap-1">
          <button onClick={likePost}>
            {isLiked ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
          </button>
          <p className="text-sm">{likeCount}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <button onClick={() => navigate(`/feed/post/${id}`)}>
            <IoChatbubbleOutline />
          </button>
          <p className="text-sm">{commentsCount}</p>
        </div>
        <IoPaperPlaneOutline />
        <button onClick={savePost}>
          {isSaved ? <MdBookmark className="text-white" /> : <MdOutlineBookmarkBorder />}
        </button>
        <button onClick={() => dispatch(openOptionsPopup())}>
          <SlOptions />
        </button>
      </div>
    </div>
  );
}

export default ReelPostCard;