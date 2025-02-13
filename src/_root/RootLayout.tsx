import Topbar from "@/components/ui/component/Topbar"
import BottomBar from "@/components/ui/component/BottomBar"
import { Outlet } from "react-router-dom"
const RootLayout = () => {
  return (
    <div className="body relative">
        <Topbar/>
        <section className="h-[90vh] mt-10">
           <Outlet/>
        </section>
        <BottomBar/>
    </div>
  )
}

export default RootLayout