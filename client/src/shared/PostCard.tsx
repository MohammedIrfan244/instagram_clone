import { Post } from "../utilities/interfaces"

interface PostCardProps {
    post: Post
    }

function PostCard({ post }: PostCardProps): JSX.Element {
  return (
  <div>
    <p>{post.thumbnail}</p>
    <p>{post.username}</p>
    <p>{post.date}</p>
    <img src={post.media} alt="" />
    <p>{post.likes}</p>
    <p>{post.caption}</p>
    <p>Save</p>
    <p>View all commnets</p>
    <p>Add a comment</p>
  </div>
  )
}

export default PostCard
