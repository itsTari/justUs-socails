import PostForm from '@/components/ui/component/PostForm'
import Spinner from '@/components/ui/component/Spinner'
import { useUserContext } from '@/context/AuthContext'
import { useGetPostById } from '@/lib/reactQuery/Queries'
import { useParams } from 'react-router-dom'

const EditPost = () => {
  const {user} = useUserContext()
  const {id} = useParams()
  const {data:post, isPending} = useGetPostById(id || '')

  if(isPending) return <Spinner size={100} color='blue'/>
  return (
    
    <div className="px-4">
        <div className="flex flex-col gap-6 items-center w-full">
          <div className="flex items-center gap-3 flex-1">
            <img src={user.imageUrl} className="bg-n-2 rounded-full" width={36} height={36} alt='add-post'/>
            <h2 className="h2">Edit post</h2>
          </div>
          <PostForm action='Update' post={post}/>
        </div>
    </div>
  )
}

export default EditPost