import PostForm from "@/components/ui/component/PostForm"
import { useUserContext } from "@/context/AuthContext"

const CreatePost = () => {
  const {user} = useUserContext()
  return (
    <div className="px-4">
        <div className="flex flex-col gap-6 items-center w-full">
          <div className="flex items-center gap-3 flex-1">
            <img src={user.imageUrl} className="bg-n-2 rounded-full" width={36} height={36} alt='add-post'/>
            <h2 className="h2">Create post</h2>
          </div>
          <PostForm/>
        </div>
    </div>
  )
}

export default CreatePost