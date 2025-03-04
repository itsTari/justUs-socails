import { useGetUsersPosts } from "@/lib/reactQuery/Queries"

const UsersPost = ({ userId }: { userId: string }) => {
    const {data:usersPost, isPending} = useGetUsersPosts(userId)
    console.log({usersPost})
  return (
    <div>UsersPost</div>
  )
}

export default UsersPost