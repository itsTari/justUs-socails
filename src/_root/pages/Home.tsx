import { useUserContext } from "@/context/AuthContext"
import { BiComment } from "react-icons/bi";
import { PiShuffleAngularFill } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import { LuShare } from "react-icons/lu";
import { useGetRecentPost } from "@/lib/reactQuery/Queries";
import {InfinitySpin } from 'react-loader-spinner'
import { Models } from "appwrite";
import PostCard from "@/components/ui/component/PostCard";

const Home = () => {
  const {user} = useUserContext()
  const {data:posts, isPending:isPostLoading, isError:isErrorPost} = useGetRecentPost()
  
  return (
    <section className="flex flex-1">
        <div className="flex flex-col flex-1 items-center gap-10 py-10 px-5 md:px-8 lg:p-14  ">
            <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9;">
              <h2 className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] text-left w-full">Home Feed</h2>
              <div className="flex items-center gap-3 w-full">
                {isPostLoading && !posts ?(
                  <InfinitySpin  width="180" color="green" />
                ):(
                  <ul className="flex flex-col gap-9 w-full">
                    {posts?.documents.map((post:Models.Document)=>(
                      <PostCard post={post}/>
                      
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
            
            {/* <div className="border-y border-n-5 flex justify-between my-4 py-2 px-4 text-2xl w-full">
                <BiComment/>
                <PiShuffleAngularFill/>
                <BiLike/>
                <FaRegBookmark/>
                <LuShare/>
            </div> */}
        </div>
    </section>
  )
}

export default Home