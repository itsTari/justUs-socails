import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useRepost, useSavePost } from '@/lib/reactQuery/Queries'
import { checkIsLiked } from '@/lib/utils'
import { Models } from 'appwrite'
import React, {useState, useEffect} from 'react'

type postStatusProps = {
    post: Models.Document,
    userId:string
}
const PostStatus = ({post, userId}: postStatusProps) => {
  // current likes on a specific post
  const likeArray = post.likes.map((user:Models.Document) => user.$id)

  const [likes, setLikes] = useState(likeArray)
  const [isSave, setIsSave] = useState(false)

  const {mutate:likePost} = useLikePost();
  const {mutate: savepost, isPending:isSavingPost} = useSavePost()
  const {mutate: unSavePost, isPending:isUnsavingPost} = useDeleteSavedPost()
  const {data : currentUser} = useGetCurrentUser()
  const {mutate:repost, isPending:isReposting} = useRepost()

  const savedPostRecord = currentUser?.save.find((record:Models.Document) => record.post.$id === post.$id)
  useEffect(()=>{
      setIsSave(!!savedPostRecord)
  },[currentUser])


  // functions for like, unlike, save and unsave post
  const handleLikePost = (e:React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    let newLikes = [...likes]
    const hasLiked = newLikes.includes(userId)
    if(hasLiked){
      newLikes = newLikes.filter((id) => id !== userId);
    }else{
      newLikes.push(userId)
    }

    setLikes(newLikes)
    likePost({postId: post.$id, likesArray: newLikes })
  }

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if(savedPostRecord){
      setIsSave(false)
      unSavePost(savedPostRecord.$id )
    }else{
      savepost({postId:post.$id, userId})
      setIsSave(true)
    }
  }
  const handleRePost =  (e: React.MouseEvent)  => {
    e.stopPropagation();
    e.preventDefault();
    
    const repostPost = repost({userId, originalPostId:post.$id, comment:'hello dear.. my own thought', timestamp:post.$createdAt})
    return repostPost
  }
  return (
    <div className='flex justify-between items-center mt-2'>
      <div className='flex gap-1 items-center'>
        <img src={` ${checkIsLiked(likes, userId) ? '/assets/svg/liked.svg' : '/assets/svg/heart.svg'}`}
          alt='like'
          onClick={(e)=> handleLikePost(e)}
           className='cursor-pointer'
          />
          <p className='text-[14px] font-medium leading-[140%] lg:text-[16px]'>{likes.length}</p>
      </div>
       
        {isReposting ? <div></div> :<img src='/assets/svg/repost.svg'
         alt='repost'
         onClick={handleRePost}
         className='cursor-pointer'
          />}
        <img src='/assets/svg/comment.svg'
         alt='comment'
         onClick={()=> {}}
         className='cursor-pointer'
          />
        { isSavingPost || isUnsavingPost ? <div></div> : <img src={`${isSave ? '/assets/svg/saved.svg' : '/assets/svg/save.svg'}`}
         alt='save'
         onClick={handleSavePost}
         className='cursor-pointer'
          />}
    </div>
  )
}

export default PostStatus