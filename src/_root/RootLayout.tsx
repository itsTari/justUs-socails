import Topbar from "@/components/ui/component/Topbar"
import BottomBar from "@/components/ui/component/BottomBar"
import { Outlet } from "react-router-dom"
const RootLayout = () => {
  return (
    <div className="relative">
        <Topbar/>
        <section className=" py-14">
           <Outlet/>
        </section>
        <BottomBar/>
    </div>
  )
}

export default RootLayout