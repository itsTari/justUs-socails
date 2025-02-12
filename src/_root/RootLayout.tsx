import Topbar from "@/components/ui/component/Topbar"
import BottomBar from "@/components/ui/component/BottomBar"
import { Outlet } from "react-router-dom"
const RootLayout = () => {
  return (
    <div className="body">
        <Topbar/>
        <section className="h-[90vh]">
           <Outlet/>
        </section>
        <BottomBar/>
    </div>
  )
}

export default RootLayout