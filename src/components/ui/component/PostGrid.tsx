import { formatDateString } from '@/lib/utils'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStatus from './PostStatus'
import { useUserContext } from '@/context/AuthContext'
type  gridPostProps= {
    post:Models.Document
}
const PostGrid = ({post}:gridPostProps) => {
    const {user} = useUserContext()
  return (
    <div className='w-full'>
          <div className="flex items-center gap-3">
              <Link to={`$/profile/${post.post.creator.$id}`}>
                <img
                  src={post.post.creator.imageUrl || ""}
                  alt="creator"
                  className="rounded-full w-10 lg:h-10"
                />
              </Link>
              <div className="flex flex-col">
                <p className="text-[12px] font-medium leading-[140%] lg:text-[15px]">
                  {post.post.creator.name}
                </p>
                <p className="text-n-4 text-[12px] lg:text-[15px]">@{post.post.creator.username}</p>
              </div>
            </div>
          <Link to={`/posts/${post.post.$id}`} >
            <div className="py-4">
              <p className="">{post.post.caption}</p>
              <ul>
                {post.post.tags.map((tag: string) => (
                  <li key={tag} className="text-blue-400">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img src={post.post.imageUrl} className="rounded-2xl" />
            </div>

            <div className="flex justify-between items-start text-n-4 py-2">
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px]">
                {formatDateString(post.post.$createdAt)}
              </p>
            </div>
            <PostStatus post={post.post} userId={user.id} />
          </Link>
    </div>
  )
}

export default PostGrid