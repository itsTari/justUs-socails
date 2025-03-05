import { z } from "zod"


export const SignUpValidation = z.object({
    name: z.string().min(2, {message:'name Too short'}),
    username: z.string().min(2, {message: 'username Too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message: 'password must be at least 8 characters.'})
  })

  export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: 'password must be at least 8 characters.'})
  })
  export const PostValidation = z.object({
    caption: z.string().min(5, {message: 'post caption must be at least 5 characters'}).max(5200),
    file: z.custom<File[] >().optional(),
    tags:z.string()
  })
  export const profileUpdateValidation = z.object({
    file: z.custom<File[] >().optional(),
    name: z.string().min(5, {message: 'name must be at least 5 characters'}).max(5200),
    username: z.string().min(5, {message: 'username caption must be at least 5 characters'}).max(5200),
    bio:z.string(),
    birthdate:z.string(),
    email:z.string().email()
  })