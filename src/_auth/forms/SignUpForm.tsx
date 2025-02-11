import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignUpValidation } from "./Validation"
import { FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"
// import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/hooks/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/reactQuery/Queries"
import { useUserContext } from "@/context/AuthContext"






const SignUpForm = () => {
    const { toast } = useToast()
    const {checkAuthUser, isLoading:isUserLoading}= useUserContext()
    const navigate = useNavigate()
    // const isLoading = false;

    const {mutateAsync:createUserAccount, isPending:isCreatingUser} = useCreateUserAccount()

    const {mutateAsync:signInAccount, isPending:isSigningIn} = useSignInAccount()

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
     async function onSubmit(values: z.infer<typeof SignUpValidation>) {
         // creating our user account.
        const newUser = await createUserAccount(values)
        if(!newUser){
          return  toast({title: "Sign up failed. please try again."})
        }
        // create a session 
        const session = await signInAccount({email:values.email, password:values.password})
        if(!session){
          return toast({title:'Sign in failed. please try again.'})
        }
        // add to the user context 
        const isLoggedIn = await checkAuthUser()
        if(isLoggedIn){
          form.reset()
          // navigate to the home page
          navigate('/')
        }else{
         return toast({title:'sign up failed. please try again'})
        }
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
        {isCreatingUser? (
            <div className="flex items-center gap-2"><FiLoader />Loading...</div>
        ):(<div>Sign up</div>)}
      </Button>
      <p className="text-n-4 text-sm pt-2">Already have an account? 
        <Link to='/sign-in' className="text-indigo-900 font-semibold ml-1">Log in</Link></p>
     </form>
     </div>
  </Form>
  )
}

export default SignUpForm