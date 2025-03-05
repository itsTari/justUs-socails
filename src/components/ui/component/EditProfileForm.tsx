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

const EditProfileForm = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof profileUpdateValidation>>({
    resolver: zodResolver(profileUpdateValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username:user.username,
      bio: user.bio || "",
      birthdate:user.birthdate || "",
      email:user.email
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof profileUpdateValidation>) {}
  const handleCancel = () => {
    navigate("/");
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
          name="birthdate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="body-1 text-n-3 ">Birth Date</FormLabel>
              <FormControl>
                <Input type="text" className=" bg-n-7 border-none" {...field} />
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

        <div className="flex gap-4 justify-end ">
          <Button type="button" onClick={handleCancel}>
            cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
