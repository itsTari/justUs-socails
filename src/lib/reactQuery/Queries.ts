import {useQuery, useMutation, useQueryClient, useInfiniteQuery} from '@tanstack/react-query'
import { createPost, createUserAccount, getCurrentUser, getRecentPosts, likePost, savedPost, signInAccount, signOutAccount, unSavePost } from '../appwrite/api'
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
export const useLikePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({postId, likesArray}: {postId:string, likesArray:string[]})=>
            likePost(postId, likesArray),
            onSuccess:(data) => {
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_POST_BY_ID, data?.$id]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_CURRENT_USER]
                })
            }
    })
}
export const useSavePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:({postId, userId}: {postId:string, userId:string})=>
            savedPost(postId, userId),
            onSuccess:() => {
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_CURRENT_USER]
                })
            }
    })
}
export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(savedRecordId:string)=> unSavePost(savedRecordId),
            onSuccess:() => {
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_RECENT_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_POSTS]
                })
                queryClient.invalidateQueries({
                    queryKey:[QUERY_KEYS.GET_CURRENT_USER]
                })
            }
    })
}
// function to know which post was saved by a particular user
export const useGetCurrentUser = () =>{
   return useQuery({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        queryFn: getCurrentUser
    })
}