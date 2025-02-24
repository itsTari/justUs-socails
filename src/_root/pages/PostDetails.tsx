import Spinner from "@/components/ui/component/Spinner";
import { useUserContext } from "@/context/AuthContext";
import { useDeletePost, useGetPostById } from "@/lib/reactQuery/Queries";
import { formatDateString } from "@/lib/utils";
import { useParams, Link , useNavigate} from "react-router-dom";

 
const PostDetails = () => {
    const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");
  const {user} = useUserContext()
  const navigate = useNavigate()
  const {mutateAsync:deletePost} = useDeletePost()
  const handleDeletePost = ()=>{
    deletePost(post?.$id || '')
    navigate(-1)
  }
  return (
    <div className="flex flex-col items-center  gap-10 py-10 px-5 md:p-14">
      {isPending ? (
        <Spinner color="blue" size={70} />
      ) : (
        <div className="bg-n-8 rounded-[30px] flex flex-col flex-1 xl:flex-col-reverse md:max-w-[70%] xl:rounded-l-[24px] p-2">
            <p className="text-n-4 text-[12px] font-semibold leading-[140%] lg:text-[14px] px-3">{formatDateString(post?.$createdAt || '')}</p>
            <p className="px-3">{post?.caption}</p>
                <ul className="px-3">
                    {post?.tags.map((tag:string)=>(
                        <li key={tag} className="text-blue-400">{tag}</li>
                    ))}
                 </ul>
            <img src={post?.imageUrl} alt='post' className="lg:h-[500px] xl:w-[100%] rounded-t-[30px] xl:rounded-l-[24px] xl:rounded-tr-none object-cover p-5"/>

          <div className="flex justify-between items-center lg:gap-7 flex-1  p-8 rounded-[30px]">
            <Link to={`$/profile/${post?.creator.$id}`} className="flex gap-3 items-center">
              <img
                src={post?.creator.imageUrl || ""}
                alt="creator"
                className="rounded-full w-10 lg:h-10"
              />
             <div className="flex flex-col">
                <p className="text-[16px] font-medium leading-[140%] lg:text-[18px]">
                    {post?.creator.name}
                </p>
                <p className="text-n-4">@{post?.creator.username}</p>
             </div>
            </Link>
            <div className="flex items-center gap-2">
                <Link to={`/edit-post/${post?.$id}`} className={`${user.id !== post?.creator.$id && 'hidden'}`}>
                    <img src='/assets/svg/edit.svg'/>
                </Link>
                <button onClick={handleDeletePost} disabled={isPending}   className={`${user.id !== post?.creator.$id && 'hidden'} bg-none`}>
                    <img src='/assets/svg/delete.svg'/>
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
