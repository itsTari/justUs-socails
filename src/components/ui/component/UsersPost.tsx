import { useGetUsersPosts } from "@/lib/reactQuery/Queries"
import Spinner from "./Spinner";
// import PostGrid from "./PostGrid";
import { Models } from "appwrite";
import { useParams } from "react-router-dom";
import PostGrid from "./PostGrid";

const UsersPost = () => {
    const {id} = useParams()
    const {data:usersPost, isPending} = useGetUsersPosts(id)
    console.log({usersPost})
  return (
    <div>
        {isPending ? <Spinner size={50} color='green'/>
        :(
            <ul className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
                {usersPost?.map((post)=>(
                    <PostGrid key={post.$id} post={post}/>
                ))}
            </ul>
        )}
    </div>
  )
}

export default UsersPost