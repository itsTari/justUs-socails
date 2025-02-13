import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../textarea"
import FileUploader from "./FileUploader"
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const PostForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
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
              <FileUploader/>
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