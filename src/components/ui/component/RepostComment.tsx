import { useRepost } from "@/lib/reactQuery/Queries";
import { useState } from "react";
import { toast } from "@/hooks/use-toast"
import { Models } from "appwrite";
type postStatusProps = {
    post: Models.Document,
    userId:string
}
const RepostComponent = ({ post, userId }:postStatusProps) => {
    const [comment, setComment] = useState(""); // Store the comment input
    const [showCommentBox, setShowCommentBox] = useState(false); // Toggle comment box
      const {mutate:repost, isPending:isReposting} = useRepost()

    const handleRepost = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (!userId || !post?.$id) return;

        try {
             repost({userId, originalPostId:post.$id, comment, timestamp:post.$createdAt});

            toast({title:"Reposted successfully!"});

            // Reset after successful repost
            setComment("");
            setShowCommentBox(false);
        } catch (error) {
            console.error("Error reposting:", error);
        }
    };

    return (
        <div className="relative">
            {isReposting ? (
                <div className="animate-spin w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
            ) : (
                <img
                    src="/assets/svg/repost.svg"
                    alt="Repost"
                    onClick={() => setShowCommentBox(true)} // Show comment box on click
                    className="cursor-pointer w-6 h-6"
                />
            )}

            {/* Comment Box - Only visible when showCommentBox is true */}
            {showCommentBox && (
                <div className=" w-56 absolute top-8 left-0 bg-n-8 border p-2 rounded shadow-md">
                    <textarea
                        className="w-full p-2 border rounded-md"
                        placeholder="Add a comment (optional)..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={handleRepost}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            disabled={isReposting}
                        >
                            {isReposting ? "Reposting..." : "Repost"}
                        </button>
                        <button
                            onClick={() => setShowCommentBox(false)}
                            className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepostComponent;
