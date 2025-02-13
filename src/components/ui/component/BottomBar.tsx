import { Link, useLocation } from "react-router-dom"
import { bottomLinks } from "@/constants";

const BottomBar = () => {
    const {pathname} = useLocation();
  return (
    <section className="w-full fixed bottom-0 md:hidden">
        <ul className="flex justify-between px-4 bg-n-7 py-1">
            {bottomLinks.map((icon, id)=>{
                const isActive = pathname === icon.route
                return <li key={id} >
                    <Link to={icon.route}><img src={icon.icon} width={40} height={40} className={`${isActive ? 'bg-pink-500' : 'bg-n-5'} p-2 rounded-md`}/></Link>
                </li>
            })}
        </ul>
    </section>
  
  )
}

export default BottomBar