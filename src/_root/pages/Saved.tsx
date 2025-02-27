import PostGrid from "@/components/ui/component/postGrid"
import Spinner from "@/components/ui/component/Spinner"
import { useGetSavedPost } from "@/lib/reactQuery/Queries"

const Saved = () => {
  const {data:savedPost, isPending} = useGetSavedPost()
  console.log({savedPost})
  // if (!savedPost || savedPost.total === 0) {
  //   return <div ></div>; // Show message if no posts are available
  // }
  return (
    <div className="flex flex-1 ">
      <div className="flex flex-1 flex-col py-10 px-5 md:px-8 lg:p-14">
        <div className="flex gap-2 items-start">
          <img src="/assets/svg/save.svg" alt='save' width={45} height={45}/>
          <h1 className="h2 md:h4"> Your Saved Posts</h1>
        </ div>
          
        <div className="flex flex-row items-center gap-3 w-full pt-8">
          
          { isPending ? <Spinner size={50} color="blue"/> :
            <ul className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
              {!savedPost || savedPost.total === 0  && <div className="h3 text-n-4">You have no saved posts.</div>} 
                
                {savedPost?.documents.map((post)=>(
                  <PostGrid key={post.$id} post={post}/>
                ))}
            </ul>
           }
        </div>
      </div>
    </div>
  )
}

export default Saved