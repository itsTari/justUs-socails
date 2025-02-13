import { useUserContext } from "@/context/AuthContext"
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { BiComment } from "react-icons/bi";
import { PiShuffleAngularFill } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import { LuShare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { links } from "@/constants";
import { INavLink } from "@/types";
const Home = () => {
  const {user} = useUserContext()
  const [showBar, setShowBar] = useState(false)
  const showModal = () => {
    if(showBar){
      setShowBar(false)
    }else{
      setShowBar(true)
    }
  }
  return (
    <section className="flex flex-col w-full items-center">
        <div className="flex flex-col w-[80%] items-center ">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <img src={user.imageUrl} className="h-8 w-8 rounded-full"/>
                <div>
                  <h4 className="h4">{user.name}</h4>
                  <p className="body-2 text-n-3">@{user.username}</p>
                </div>
              </div>
              <div className="relative">
                <PiDotsThreeOutlineLight className="text-2xl md:text-4xl cursor-pointer" onClick={showModal} />
                    <div className={`${showBar ? 'flex': 'hidden'} bg-n-1 w-40 absolute right-1 p-2 flex-col items-start rounded-md gap-3 transition`}>
                      {links.map((item: INavLink)=>(
                        <Link to={item.route} className="text-n-8 mt-2 hover:text-n-7">{item.label}</Link>
                      )
                      )}
                      <Button>delete post</Button>
                    </div> 
              </div>
            </div>
            <div className="w-full h-[50vh] mt-6 p-1">
                post goes here
            </div>
            <div className="border-y border-n-5 flex justify-between my-4 py-2 px-4 text-2xl w-full">
                <BiComment/>
                <PiShuffleAngularFill/>
                <BiLike/>
                <FaRegBookmark/>
                <LuShare/>
            </div>
        </div>
    </section>
  )
}

export default Home