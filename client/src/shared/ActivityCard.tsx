import { useNavigate } from "react-router-dom";

interface Post {
    _id: string;
    media: string;
    username: string;
    caption: string;
    isReel: boolean
}

function ActivityCard({
  _id,
  media,
  username,
  caption,
  isReel
}: Post) {
    const navigate=useNavigate()
  return (
    <div className="w-full text-xs justify-between gap-3 flex h-[50px]" onClick={()=>navigate(`/feed/post/${_id}`)}>
     <div>
     {isReel?(
          <video src={media} className="w-full h-full object-contain"></video>
        ):(
            <img src={media} alt="Post" className="w-full h-full object-contain" />
        )}
     </div>
        <div className="w-[200px] h-full justify-between flex flex-col">
        <p className="font-semibold">{username}</p>
        <p className="font-light">{caption ? caption : "No caption"}</p>
        </div>
    </div>
  )
}

export default ActivityCard
