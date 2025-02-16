import { Link } from "react-router-dom"
import { Button } from "../button"
import { useSignOut } from "@/lib/reactQuery/Queries"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { links } from "@/constants";
import { INavLink } from "@/types";

const Topbar = () => {
    const {mutateAsync:signOut, isSuccess} = useSignOut()
    const {user} = useUserContext()
    const navigate = useNavigate()
    useEffect(()=>{
        if(isSuccess)navigate('/sign-in')
    },[isSuccess])

     const [showBar, setShowBar] = useState(false)
      const showModal = () => {
        if(showBar){
          setShowBar(false)
        }else{
          setShowBar(true)
        }
      }
  return (
    <header>
        <div className='flex justify-between py-4 px-5'>
            <Link to='/' className='flex gap-3 items-center'>
                <div className="text-pink-400 tracking-tighter">JustUsLogo</div>
            </Link>
            <div className="flex items-center gap-5">
                <div className="relative hidden md:block ">
                    <PiDotsThreeOutlineLight className="text-2xl md:text-4xl cursor-pointer" onClick={showModal} />
                        <div className={`${showBar ? 'flex': 'hidden'} bg-n-1 w-40 absolute right-1 p-2 flex-col items-start rounded-md gap-3 transition`}>
                          {links.map((item: INavLink)=>(
                            <Link to={item.route} className="text-n-8 mt-2 hover:text-n-7">{item.label}</Link>
                          )
                          )}
                          <Button>delete post</Button>
                        </div> 
                </div>
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