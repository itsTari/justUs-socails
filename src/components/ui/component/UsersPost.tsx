import { useGetCurrentUser, useGetUsersPosts } from "@/lib/reactQuery/Queries"
import Spinner from "./Spinner";
// import PostGrid from "./PostGrid";
import { Models } from "appwrite";
import { useParams } from "react-router-dom";

const UsersPost = () => {
    const {id} = useParams()
    const {data:usersPost, isPending} = useGetUsersPosts(id)
    const { data: currentUser} = useGetCurrentUser();
    // console.log({usersPost})
  return (
    <div>
        {isPending ? <Spinner size={50} color='green'/>
        :(
            <ul>
                {currentUser?.posts.map((post:Models.Document)=>(
                    // <PostGrid post={post}/>
                    <li></li>
                )
                )}
            </ul>
        )}
    </div>
  )
}

export default UsersPost