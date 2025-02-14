import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../textarea"
import FileUploader from "./FileUploader"
import { PostValidation } from "@/_auth/forms/Validation"
import { Models } from "appwrite"
import { useUserContext } from "@/context/AuthContext"
import { toast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost } from "@/lib/reactQuery/Queries"
 
type PostFormProps ={
    post?:Models.Document;
}

const PostForm = ({post}: PostFormProps) => {
    const  {mutateAsync:createPost , isPending:isLoadingPost} = useCreatePost();
    const {user} = useUserContext();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof PostValidation >>({
        resolver: zodResolver(PostValidation ),
        defaultValues: {
          caption: post? post?.caption: '',
          file:[],
          tags:post ? post?.tags.join(','):''
        },
      })
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof PostValidation >) {
        // Do something with the form values.
            const newPost = await createPost({...values, userId:user.id,})
            if(!newPost) {
                toast({title:'please try again later'})
            }
            navigate('/')
        console.log(values)
      }
    
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
          <FormItem>
            <FormLabel className="body-1 text-n-3 ">What&apos;s happening?</FormLabel>
            <FormControl>
              <Textarea  className=' bg-n-7 h-[9rem]  border-none'placeholder="What's happening?" {...field} />
            </FormControl>
            <FormMessage  />
          </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
          <FormItem>
            <FormLabel className="body-1 text-n-3">Add photo</FormLabel>
            <FormControl>
              <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl}/>
            </FormControl>
            <FormMessage  />
          </FormItem>
            )}
        />
         <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
          <FormItem>
            <FormLabel className="body-1 text-n-3 ">Tags</FormLabel>
            <FormControl>
                <Input type='text' className=' bg-n-7 border-none' placeholder="fun, learning, art, music" {...field} />
            </FormControl>
            <FormMessage  />
          </FormItem>
            )}
        />
        <div className="flex gap-4 justify-end ">
        <Button type="button">cancel</Button>
        <Button type="submit">Submit</Button>
        </div>
        </form>
    </Form>
  )
}

export default PostForm