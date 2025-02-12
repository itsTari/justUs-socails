import Topbar from "@/components/ui/component/Topbar"
import { Outlet } from "react-router-dom"
const RootLayout = () => {
  return (
    <div className="body">
        <Topbar/>
        <section>
           <Outlet/>
        </section>
    </div>
  )
}

export default RootLayout