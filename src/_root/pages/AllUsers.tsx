import Spinner from "@/components/ui/component/Spinner"
import { useGetUsers } from "@/lib/reactQuery/Queries"
import { Models } from "appwrite"
import { Link } from "react-router-dom"


const AllUsers = () => {
  const {data: getUsers, isPending} = useGetUsers()
  console.log({getUsers})
  return (
    <div className="px-4">
      <div className="h2 flex items-center gap-3"><img src="/assets/svg/users.svg" alt="users" className="md:w-11"/> AllUsers</div>
      {isPending ? <Spinner size={70} color="blue"/> :
      <ul className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-10">
         {getUsers?.documents.map((user: Models.Document)=>(
          <li className="w-full border border-n-4 rounded-xl p-2">
            <Link to={`/profile/${user.$id}`} className="flex items-center flex-col gap-3">
                <img src={user.imageUrl} className="rounded-full w-32 h-32"/>
                <div className="leading-none text-center">
                  <h1 className="h6">{user.name}</h1>
                  <p className="body-2 text-n-3">@{user.username}</p>
                </div>
            </Link>
          </li>
        ))}
      </ul>
}
    </div>
  )
}

export default AllUsers