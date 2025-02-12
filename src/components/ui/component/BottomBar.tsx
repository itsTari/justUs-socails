import { Link, useLocation } from "react-router-dom"
import { CiHome } from "react-icons/ci";
import { FaUserAlt } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io"
import { FaRegBookmark } from "react-icons/fa6";

const BottomBar = () => {
    const {pathname} = useLocation();
  return (
    <>
    </>
    // <section className="flex w-full justify-between bg-n-11 px-6 py-1">
    //         <Link to='/' className={`${pathname && 'bg-pink-500'} p-1 rounded-md bg-n-11 hover:bg-pink-500`}><CiHome  className="text-2xl"/></Link>
    //         <Link to='/all-users' className={`${pathname && 'bg-pink-500'} bg-n-11 p-1 rounded-md hover:bg-pink-500`}><FaUserAlt className="text-2xl" /></Link>
    //         <Link to='/saved' className={`${pathname  &&'bg-pink-500'} bg-n-11 p-1 rounded-md hover:bg-pink-500`}><FaRegBookmark className="text-2xl" /></Link>
    //         <Link to='/create-post' className={`${pathname && 'bg-pink-500'} bg-n-11 p-1 rounded-md hover:bg-pink-500`}><IoIosCreate className="text-2xl" /></Link>
    // </section>
  )
}

export default BottomBar