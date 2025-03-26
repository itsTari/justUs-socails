export type IContextType={
    user:IUser,
    isLoading:boolean,
    setUser:React.Dispatch<React.SetStateAction<IUser>>,
    isAuthenticated:boolean,
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>,
    checkAuthUser:()=>Promise<boolean>
}
export type INavLink ={
    imgURL:string;
    route:string;
    label:string;
}
export type IUser ={
    id: string;
    name:string;
    username:string;
    email:string;
    imageUrl:string;
    bio:string;
    website?: string;
    dateOfBirth?:string;
}
export type INewUser={
    name:string
    username:string;
    email:string;
    password:string;
}

export type IUpdateUser ={
    userId: string;
    name:string;
    username:string;
    email:string;
    bio:string;
    website?: string;
    dateOfBirth?:string;
    imageId:string;
    imageUrl:URL | string;
    file?: File[] | null;
}
export type InewPost = {
    userId:string;
    caption:string;
    file?: File[] | null;
    tags?:string;
}
export type IUpdatePost = {
    postId:string;
    caption:string;
    imageId:string;
    imageUrl:URL| string;
    file?: File[] | null;
    tags?:string;
}
export type IRepost={
    userId:string;
    originalPostId:string;
    comment?:string;
    // timestamp:string
}