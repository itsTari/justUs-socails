import { PiWarningBold } from "react-icons/pi";
import { Button } from "../button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="w-full h-[100vh] flex flex-col items-center justify-center">
        <h2>Opps looks like you&apos;ve entered a wrong page</h2>
        <PiWarningBold className="text-[8rem]"/>
        <Button>
            <Link to='/'>
                go to home page
            </Link>
        </Button>
    </section>
  )
}

export default NotFound