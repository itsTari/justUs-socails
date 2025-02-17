import { useUserContext } from "@/context/AuthContext"
import { formatDateString } from "@/lib/utils"
import { Models } from "appwrite"
import { Link } from "react-router-dom"

type postCardProps = {
    post: Models.Document
}

const PostCard = ({post}: postCardProps) => {
    const {user} = useUserContext()
    if(!post.creator) return;
  return (
    <div className="rounded-2xl border p-5 lg:p-7 w-full max-w-screen-sm">
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
                <Link to={`$/profile/${post.creator.$id}`}>
                    <img src={post.creator.imageUrl || ''} alt='creator' className="rounded-full w-12 lg:h-12"/>
                    </Link>
                <div className="flex flex-col">
                    <p className="text-[16px] font-medium leading-[140%] lg:text-[18px]">{post.creator.name}</p>
                    <p className="text-n-4">@{post.creator.username}</p>
                </div>

            </div>
            <Link to={`/edit-post/${post.$id}`} className={`${user.id !== post.creator.$id && 'hidden'}`}><img src="/public/assets/icons/edit.png" alt='edit'/></Link>
        </div>
        <Link to={`/posts/${post.$id}`}>
            <div>
                 <p>{post.caption}</p>
                 <ul>
                    {post.tags.map((tag:string)=>(
                        <li key={tag}>#{tag}</li>
                    ))}
                 </ul>
            </div>

            <div className="flex justify-between items-start text-n-4">
                <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px]">{formatDateString(post.$createdAt)}</p>
            </div>
        </Link>
       
    </div>
  )
}

export default PostCard