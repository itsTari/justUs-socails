import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query'
import { createPost, createUserAccount, getRecentPosts, signInAccount, signOutAccount } from '../appwrite/api'
import { InewPost, INewUser } from '@/types'
import { QUERY_KEYS } from './Querieskey'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user:{email:string; password:string}) => signInAccount(user)
    })
}
export const useSignOut = () =>{
    return useMutation({
        mutationFn: () => signOutAccount()
    })
}
export const useCreatePost = () =>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (post :InewPost) => createPost(post),
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:[QUERY_KEYS.GET_RECENT_POSTS]

            })
        }
    })
}
// query to get recent post
export const useGetRecentPost = () =>{
    return useQuery({
        queryKey:[QUERY_KEYS.GET_RECENT_POSTS],
        queryFn:() => getRecentPosts()
    })
}