import PostForm from "@/components/ui/component/PostForm"


const CreatePost = () => {
  return (
    <div className="px-4">
        <div className="common-container flex flex-col gap-6 items-center w-full">
          <div className="flex gap-3 items-center">
            <img src='/public/assets/icons/edit.png' className="bg-n-2 rounded-md" width={36} height={36} alt='add-post'/>
            <h2 className="h2">Create post</h2>
          </div>
          <PostForm/>
        </div>
    </div>
  )
}

export default CreatePost