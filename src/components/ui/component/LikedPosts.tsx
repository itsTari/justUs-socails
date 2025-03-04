import { useGetCurrentUser } from "@/lib/reactQuery/Queries";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { formatDateString } from "@/lib/utils";
import { Models } from "appwrite";

const LikedPosts = () => {
  const { data: currentUser, isPending } = useGetCurrentUser();
  // console.log({ currentUser });
  return (
    <div>
      {isPending ? (
        <Spinner size={50} color="blue" />
      ) : (
        <ul className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 ">
          {currentUser?.liked.map((post:Models.Document) => (
            <li key={post.$id} className="w-full">
              <div>
                <div className="flex items-center gap-3">
                  <Link to={`/profile/${post.creator.$id}`}>
                    <img
                      src={post.creator.imageUrl || ""}
                      alt="creator"
                      className="rounded-full w-10 lg:h-10"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <p className="text-[12px] font-medium leading-[140%] lg:text-[15px]">
                      {post.creator.name}
                    </p>
                    <p className="text-n-4 text-[12px] lg:text-[15px]">
                      @{post.creator.username}
                    </p>
                  </div>
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
                  {/* <PostStatus post={post} userId={user.id} /> */}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LikedPosts;
