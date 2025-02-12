import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SignInValidation } from "./Validation"
import { FiLoader } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"
// import { createUserAccount } from "@/lib/appwrite/api"
import { useToast } from "@/hooks/use-toast"
import { useSignInAccount } from "@/lib/reactQuery/Queries"
import { useUserContext } from "@/context/AuthContext"






const SignInForm = () => {
    const { toast } = useToast()
    const {checkAuthUser, isLoading:isUserLoading}= useUserContext()
    const navigate = useNavigate()
    // const isLoading = false;

    const {mutateAsync:signInAccount} = useSignInAccount()

    const form = useForm<z.infer<typeof SignInValidation>>({
        resolver: zodResolver(SignInValidation),
        defaultValues: {
          email: "",
          password:""
        },
      })
     
      // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof SignInValidation>) {
        // create a session 
        const session = await signInAccount({email:values.email, password:values.password})
        if(!session){
          return toast({title:'Sign in failed. please try again.'})
        }
        // add to the user context 
        const isLoggedIn = await checkAuthUser()
        console.log(isLoggedIn)
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
        <div className="flex flex-col justify-center items-center">
            <div className="text-pink-400 tracking-tighter">JustUsLogo</div>
            <h5 className="h5">Log in to your account.</h5>
            <p className="text-n-3 text-sm mt-2">Welcome back. please enter your details.</p>
     <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-5 mt-4">
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
        {isUserLoading? (
            <div className="flex items-center gap-2"><FiLoader />Loading...</div>
        ):(<div>Sign in </div>)}
      </Button>
      <p className="text-n-4 text-sm pt-2 text-center">New to JustUs? 
        <Link to='/sign-up' className="text-indigo-900 font-semibold ml-1">Sign up</Link></p>
     </form>
     </div>
  </Form>
  )
}

export default SignInForm