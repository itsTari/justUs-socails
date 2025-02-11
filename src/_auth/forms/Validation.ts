import { z } from "zod"


export const SignUpValidation = z.object({
    name: z.string().min(2, {message:'name Too short'}),
    username: z.string().min(2, {message: 'username Too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message: 'password must be at least 8 characters.'})
  })