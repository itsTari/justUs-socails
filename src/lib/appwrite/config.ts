import {Client, Account, Databases, Storage, Avatars} from 'appwrite'

export const appwriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_URL,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    savesId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
    usersId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    postsId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    repostId: import.meta.env.VITE_APPWRITE_REPOSTS_COLLECTION_ID
}
export const client = new Client();
// configuring our client
client.setProject(appwriteConfig.projectId);
// setting up the endpoint
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client);
export const db = new Databases(client);
export const storage = new Storage(client);
export const avarter = new Avatars(client);
