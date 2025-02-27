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
    <div className='w-full grid grid-cols-1 grid-flow-row lg:grid-cols-2 xl:grid-cols-3 gap-7 max-w-5xl'>
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