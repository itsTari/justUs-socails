import { Link } from "react-router-dom"

const PostIcon = () => {
  return (
    <div className='fixed bottom-14 right-0 pr-6 '>
       <Link to='/create-post'><img src='/assets/svg/create.svg' className='bg-white rounded-full' width={40}/></Link> 
    </div>
  )
}

export default PostIcon