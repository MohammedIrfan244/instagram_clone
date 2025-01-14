import axiosErrorManager from "../../utilities/axiosErrorManager"
import axiosInstance from "../../utilities/axiosInstance"
import { useEffect, useState } from "react"
import { Post } from "../../utilities/interfaces"
import ReelPostCard from "../../shared/ReelPostCard"


function ReelPage(): JSX.Element {
  const [reels, setReels] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const fetchReels = async (): Promise<void> => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/user/post/reel_page')
      setReels(response.data.reels)
      console.log(response.data.reels)
    } catch (error) {
      console.log(axiosErrorManager(error))
    }
    finally {
      setLoading(false)
    }
  }
  const deletePost = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/user/post/delete_post/${id}`)
      fetchReels()
      console.log(response.data)
    } catch (error) {
      console.log(axiosErrorManager(error))
    }
  }

  useEffect(() => {
    fetchReels()
  }, [])
  return (
    <div className="lg:ps-[250px] flex flex-col items-center">
      {loading && (
        <div className="h-[500px] w-[300px] flex justify-center items-center">
          <span className="spinner"/>
        </div>
      )}
      {!loading && reels.length === 0 && <p>No reels available</p>}
      {reels.map((reel, index) => <ReelPostCard onDelete={() => deletePost(reel._id)} key={index + reel._id} id={reel._id} media={reel.media} username={reel.username} likesCount={reel.likesCount} commentsCount={reel.commentsCount} caption={reel.caption} />)}
    </div>
  )
}

export default ReelPage
