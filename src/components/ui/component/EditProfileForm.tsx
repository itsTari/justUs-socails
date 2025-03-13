import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { profileUpdateValidation } from "@/_auth/forms/Validation";
import ProfilePicUpload from "./ProfilePicUpload";
import { useUpdateUser } from "@/lib/reactQuery/Queries";
import { toast } from "@/hooks/use-toast";

const EditProfileForm = () => {
  const { user } = useUserContext();
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } = useUpdateUser();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof profileUpdateValidation>>({
    resolver: zodResolver(profileUpdateValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username:user.username,
      bio: user.bio || "",
      dateOfBirth:user.dateOfBirth,
      email:user.email,
      website:user.website,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof profileUpdateValidation>) {
    const User = await updateUser({...values, userId:user.id, imageUrl:user.imageUrl, imageId:''})
    console.log({User})
    if(!User){
      toast({title: 'updating Profile failed please try again'})
    }
    navigate(-1)
    // console.log({User})
  }
  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-3xl"
      >
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ProfilePicUpload fieldChange={field.onChange} mediaUrl={user.imageUrl}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="body-1 text-n-3 ">Name</FormLabel>
              <FormControl>
                <Input type="text" className=" bg-n-7 border-none" {...field} />
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
              <FormLabel className="body-1 text-n-3 ">Username</FormLabel>
              <FormControl>
                <Input type="text" className=" bg-n-7 border-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="body-1 text-n-3 ">Bio</FormLabel>
              <FormControl>
                <Textarea
                  className=" bg-n-7 h-[9rem] p-10 border-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="body-1 text-n-3 ">Birth Date</FormLabel>
              <FormControl>
                <Input type="date" className=" bg-n-7 border-none" {...field}  />
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
              <FormLabel className="body-1 text-n-3 ">Email</FormLabel>
              <FormControl>
                <Input type="text" className=" bg-n-7 border-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="body-1 text-n-3 ">Website Link</FormLabel>
              <FormControl>
                <Input type="url" className=" bg-n-7 border-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 justify-end ">
          <Button type="button" onClick={handleCancel}>
            cancel
          </Button>
          <Button type="submit" disabled={isLoadingUpdate}>{isLoadingUpdate? 'Updating' : 'Save'}</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
