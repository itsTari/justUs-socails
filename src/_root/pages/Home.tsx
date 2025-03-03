
import { useGetRecentPost } from "@/lib/reactQuery/Queries";
import Spinner from '@/components/ui/component/Spinner'
import { Models } from "appwrite";
import PostCard from "@/components/ui/component/PostCard";
import PostIcon from "@/components/ui/component/PostIcon";

const Home = () => {
 
  // const {user} = useUserContext()
  const {data:posts, isPending:isPostLoading} = useGetRecentPost()
  console.log({posts})
  return (
    <section className="flex flex-1">
        <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14  ">
            <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9;">
              <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">Home Feed</h2>
              <div className="flex items-center gap-3 w-full">
                {isPostLoading && !posts ?(
                  <Spinner size={140} color="blue"  />
                ):(
                  
                  <ul className="flex flex-col gap-9">
                    {posts?.map((post:Models.Document)=>(
                      <PostCard key={post.id} post={post}/>
                      
                    ))}
                  </ul>
                )}
                {/* <img src={user.imageUrl} className="h-8 w-8 rounded-full"/>
                <div>
                  <h4 className="h4">{user.name}</h4>
                  <p className="body-2 text-n-3">@{user.username}</p>
                </div> */}
              </div>
            </div>
            <PostIcon/>
        </div>
    </section>
  )
}

export default Home