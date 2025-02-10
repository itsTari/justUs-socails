import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FiLoader } from "react-icons/fi";



const SignUpValidation = z.object({
    name: z.string().min(2, {message:'name Too short'}),
    username: z.string().min(2, {message: 'username Too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message: 'password must be at least 8 characters.'})
  })

const SignUpForm = () => {
    const isLoading = true;
    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            name:"",
          username: "",
          email: "",
          password:"",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof SignUpValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

  return (
    <Form {...form}>
        <div className="">
            <div className="text-pink-400 tracking-tighter text-center">JustUsLogo</div>
            <h5 className="h5">Create a new account</h5>
     <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5 mt-4">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
             <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                <Input type="text" placeholder="enter your name" {...field} />
                </FormControl>
                <FormMessage />
             </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
             <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                <Input type="text" placeholder="enter a username" {...field} />
                </FormControl>
                <FormMessage />
             </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
             <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input type="email" placeholder="@glory.com" {...field} />
                </FormControl>
                <FormMessage />
             </FormItem>
            )}
        />
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
             <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                <Input type="text" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
             </FormItem>
            )}
        />
      <Button type="submit">
        {isLoading? (
            <div className="flex items-center gap-2"><FiLoader />Loading...</div>
        ):(<div>Sign up</div>)}
      </Button>
     </form>
     </div>
  </Form>
  )
}

export default SignUpForm