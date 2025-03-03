// import { useUserContext } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import LikedPosts from "@/components/ui/component/LikedPosts"
import { useGetCurrentUser, useGetUserById } from "@/lib/reactQuery/Queries"
import { useParams } from "react-router-dom"

const EditButton = () =>{
  return(
    <Button>Edit profile</Button>
  )
}
const FollowButton = () =>{
  return(
    <Button>Follow</Button>
  )
}

const Profile = () => {
  // const {user} = useUserContext()
  const {id} = useParams()
  const {data : currentUser} = useGetCurrentUser()

  const isOwnProfile = id === "me" || id === currentUser?.$id;
  const { data: otherUser} = useGetUserById(id);

  const profileUser = isOwnProfile ? currentUser : otherUser;


  return (
    <div className="px-5 md:px-16">
       <div className="flex justify-between ">
        <img src={profileUser?.imageUrl} alt='profile'className="h-12 w-12 md:h-16 md:w-16 rounded-full border border-4"/>
        {isOwnProfile ? <EditButton /> : <FollowButton />}
       </div>
       <div className="py-2">
          <h1 className="text-[16px] font-medium leading-[140%] lg:text-[18px]">{profileUser?.name}</h1>
          <p className="text-n-4">@{profileUser?.username}</p>
          <p>{profileUser?.bio}</p>
          <div>
            <span className="text-n-3 pr-4"><span className="text-white">0</span> following</span>
            <span className="text-n-3"><span className="text-white">0</span> followers</span>
          </div>
       </div>
       <div className="flex gap-6 py-10">
          <Button>Posts</Button>
          <Button>Liked posts</Button>
       </div>
       <LikedPosts/>
    </div>
  )
}

export default Profile