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
    name: z.string(),
    username: z.string().max(20, {message:'username above 20 char not accepted'}),
    bio:z.string(),
    dateOfBirth:z.string().optional(),
    email:z.string().email(),
    website:z.string().optional()
  })