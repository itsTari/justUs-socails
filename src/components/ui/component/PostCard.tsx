import { useUserContext } from "@/context/AuthContext";
import { formatDateString, multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStatus from "./PostStatus";

type postCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: postCardProps) => {
  const { user } = useUserContext();
  if (!post.creator && !post?.originalPostId) return;
  return (
    <div className="rounded-2xl border lg:p-7 p-5 max-w-screen-sm">
      {post.originalPostId ? (
        // repost Ui
        <>
          <div className="border border-n-4 rounded-xl p-2 mb-3">
            <p className="flex gap-1 py-2 items-center text-n-3">
              <img src="assets/svg/reposted.svg" width={40} /> by{" "}
              <strong className="text-n-2"> @{post?.userId?.username}</strong>
            </p>
            {post.comment && <p>"{post.comment}"</p>}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to={`/profile/${post?.originalPostId?.creator?.$id}`}>
                <img
                  src={post?.originalPostId?.creator?.imageUrl || ""}
                  alt="creator"
                  className="rounded-full w-12 lg:h-12"
                />
              </Link>
              <div className="flex flex-col">
                <p className="text-[16px] font-medium leading-[140%] lg:text-[18px]">
                  {post?.originalPostId?.creator?.name}
                </p>
                <p className="text-n-4">
                  @{post?.originalPostId?.creator?.username}
                </p>
              </div>
            </div>
          </div>
          <Link to={`/posts/${post?.originalPostId?.$id}`}>
            <div className="py-4">
              <p>{post?.originalPostId?.caption}</p>
              <ul>
                {post.originalPostId?.tags?.map((tag: string) => (
                  <li key={tag} className="text-blue-400">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img
                src={post?.originalPostId?.imageUrl}
                className="rounded-2xl"
              />
            </div>

            <div className="flex justify-between items-start text-n-4 py-2">
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px]">
                reposted {multiFormatDateString(post.$createdAt)}
              </p>
            </div>
            <PostStatus post={post} userId={user.id} />
          </Link>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Link to={`/profile/${post.creator.$id}`}>
                <img
                  src={post.creator.imageUrl || ""}
                  alt="creator"
                  className="rounded-full w-12 lg:h-12"
                />
              </Link>
              <div className="flex flex-col">
                <p className="text-[16px] font-medium leading-[140%] lg:text-[18px]">
                  {post.creator.name}
                </p>
                <p className="text-n-4">@{post.creator.username}</p>
              </div>
            </div>
            <Link
              to={`/edit-post/${post.$id}`}
              className={`${user.id !== post.creator.$id && "hidden"}`}
            >
              <img src="/assets/svg/edit.svg" alt="edit" />
            </Link>
          </div>
          <Link to={`/posts/${post.$id}`}>
            <div className="py-4">
              <p className="">{post.caption}</p>
              <ul>
                {post.tags.map((tag: string) => (
                  <li key={tag} className="text-blue-400">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img src={post.imageUrl} className="rounded-2xl" />
            </div>

            <div className="flex justify-between items-start text-n-4 py-2">
              <p className="text-[12px] font-semibold leading-[140%] lg:text-[14px]">
                {formatDateString(post.$createdAt)}
              </p>
            </div>
            <PostStatus post={post} userId={user.id} />
          </Link>
        </>
      )}
    </div>
  );
};

export default PostCard;
