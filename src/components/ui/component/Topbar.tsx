import { Link } from "react-router-dom"
import { Button } from "../button"
import { useSignOut } from "@/lib/reactQuery/Queries"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"

const Topbar = () => {
    const {mutateAsync:signOut, isSuccess} = useSignOut()
    const {user} = useUserContext()
    const navigate = useNavigate()
    useEffect(()=>{
        if(isSuccess)navigate('/sign-in')
    },[isSuccess])
  return (
    <header className=''>
        <div className='flex justify-between py-4 px-5'>
            <Link to='/' className='flex gap-3 items-center'>
                <div className="text-pink-400 tracking-tighter">JustUsLogo</div>
            </Link>
            <div className="flex items-center gap-5">
                <Link to={`/profile/${user.id}`}>
                    <img src={user.imageUrl} alt='profile'className="h-8 w-8 rounded-full"/>
                </Link>
                <Button onClick={()=>signOut()}>
                    sign out
                </Button>  
            </div>
            
        </div>
    </header>
  )
}

export default Topbar