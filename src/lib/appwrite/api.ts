import { InewPost, INewUser, IRepost, IUpdatePost } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avarter, db, storage } from "./config";

export async function createUserAccount(user:INewUser){
    try{
        const newAccount = await account.create(ID.unique(), user.email, user.password, user.name)

        if(!newAccount) throw Error
        const avarterUrl = avarter.getInitials(user.name)
        const newUser = await saveUserToDb({accountId: newAccount.$id, name:newAccount.name, email:newAccount.email, username:user.username, imageUrl:avarterUrl})
        return newUser;
    }catch(error){
        console.log(error)
        return error
    }
}
export async function saveUserToDb (user:{accountId:string; email:string; name:string; imageUrl:URL | string; username?:string}){
    try{
        const newUser = await db.createDocument(appwriteConfig.databaseId, appwriteConfig.usersId, ID.unique(), user)
        return newUser
    }catch (error){
        console.log(error)
    }
}
export async function signInAccount(user:{email:string; password:string}){
        try{
            const session = await account.createEmailPasswordSession(user.email, user.password)
            return session
        }catch(error){
            console.log(error)
        }
}
//
export async function getCurrentUser(){
    try {
        const currentAccount = await account.get()
        if(!currentAccount) throw Error
        // retrive the current account if it does exist
        const currentUser = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.usersId, [Query.equal('accountId', currentAccount.$id)])
        if(!currentUser) throw Error
        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}
export async function signOutAccount(){
    try{
        const session = await account.deleteSession('current')
        return session
    }catch(error){
        console.log(error)
    }
}
export async function createPost(post: InewPost){
    try {
        
        const file = post.file?.[0]
        if(!file) return 
        // upload image to storage
        // if(post.file && post.file.length>0){
            const uploadedFile = await uploadFile(file)
        
            if(!uploadedFile) throw Error
            // else get fileUrl
            const fileUrl = await getFilePreview(uploadedFile.$id)
            if(!fileUrl){
                deleteFile(uploadedFile.$id)
                throw Error
            }
            console.log({fileUrl})
        // }

        const tags = post.tags?.replace(/ /g, '').split(',') || []
        // save post to db
        const newPost = await db.createDocument(appwriteConfig.databaseId, appwriteConfig.postsId, ID.unique(),{
            creator:post.userId,
            caption:post.caption,
            imageUrl:fileUrl,
            imageId: uploadedFile.$id,
            tags:tags
        })
        // console.log({newPost})
        if(!newPost){
            deleteFile(uploadedFile.$id)
            throw Error
        }
        return newPost
    } catch (error) {
        console.log(error)
    }
}
export async function uploadFile(file:File){
    
    try {
       const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), file) 
        return uploadedFile
    } catch (error) {
        console.log(error)
    }
}
export async function getFilePreview(fileId:string){
    try {
        const fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000)
        return fileUrl
    } catch (error) {
        console.log(error)
    }
}
export async function deleteFile(fileId:string){
    try {
        await storage.deleteFile(appwriteConfig.storageId, fileId)
        return {status :'ok'}
    } catch (error) {
        console.log(error)
    }
}
export async function getRecentPosts(){
    const posts = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsId, [Query.orderDesc('$createdAt'), Query.limit(20)])
    const repost = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.repostId)
    if(!posts) throw Error
    if(!repost) throw Error
    const updatedPost =  [...posts.documents, ...repost.documents]
    return updatedPost
}
export async function likePost(postId:string, likesArray:string[]){
    try {
        const updatedPost = await db.updateDocument(appwriteConfig.databaseId, appwriteConfig.postsId, postId, 
            {
            likes:likesArray
            })
        if(!updatedPost) throw Error
        return updatedPost
    } catch (error) {
        console.log(error)
    }
}
export async function savedPost(postId:string, userId:string){
    try {
        const updatedPost = await db.createDocument(appwriteConfig.databaseId, appwriteConfig.savesId, ID.unique(), 
            {
            user:userId,
            post:postId
            })
            console.log({updatedPost})
        if(!updatedPost) throw Error
        return updatedPost
    } catch (error) {
        console.log(error)
    }
}
export async function unSavePost(savedRecordId:string){
    try {
        const statusCode = await db.deleteDocument(appwriteConfig.databaseId, appwriteConfig.savesId, savedRecordId)
        if(!statusCode) throw Error
        return{status:'ok'}
    } catch (error) {
        console.log(error)
    }
}
// repost logic

export async function createRepost(repost:IRepost){
    // const {data:currentUser} = useGetCurrentUser()
    try {
        // fetch the original post 
        // const post = await db.getDocument(appwriteConfig.databaseId, appwriteConfig.postsId, postId)
       
        // repost to database
        const res = await db.createDocument(appwriteConfig.databaseId, appwriteConfig.repostId, ID.unique(), 
        {
            userId:repost.userId,
            originalPostId:repost.originalPostId,
            comment:repost.comment,
            timestamp:repost.timestamp
        })
        console.log('repost created:', res)
        if(!res) throw Error
        return res
    } catch (error) {
        console.log('Error creating repost',error)
    }

}
// export async function fetchRepost(){
//     const originalPost = await db.listDocuments(appwriteConfig.databaseId, appwriteConfig.postsId)
    
//     return [...originalPost.documents, ...repost.documents]
// }

export async function getPostbyId (postId:string){
    try {
        const post = await db.getDocument(appwriteConfig.databaseId, appwriteConfig.postsId, postId)
        return post
    } catch (error) {
        console.log(error)
    }
}
export async function UpdatePost(post: IUpdatePost){
    const hasUpdateFile = post.file?.length > 0;
    try {
        
        let image  = {
            imageUrl:post.imageUrl,
            imageId:post.imageId
        }
        if(hasUpdateFile){
            const file = post.file?.[0]
            if(!file) return 
            const uploadedFile = await uploadFile(file)

            if(!uploadedFile) throw Error
            // else get fileUrl
            const fileUrl = await getFilePreview(uploadedFile.$id)
            if(!fileUrl){
                deleteFile(uploadedFile.$id)
                throw Error
            }

            image = {...image, imageUrl:fileUrl, imageId:uploadedFile.$id }
        }
        

        const tags = post.tags?.replace(/ /g, '').split(',') || []
        // save post to db
        const updatedPost = await db.updateDocument(appwriteConfig.databaseId, appwriteConfig.postsId, post.postId,{
            caption:post.caption,
            imageUrl:image.imageUrl,
            imageId:image.imageId,
            tags:tags
        })
        if(!updatedPost){
            await deleteFile(post.imageId)
            throw Error
        }
        return updatedPost
    } catch (error) {
        console.log(error)
    }
}
export async function deletePost(postId:string) {
    // if(!postId || !imageId) throw Error
    try {
       const deletepost = await db.deleteDocument(appwriteConfig.databaseId, appwriteConfig.postsId,postId)
       if(!deletepost) throw Error
    //    await deleteFile(imageId)
        return{status: 'ok'}
    } catch (error) {
        console.log(error)
    }
}