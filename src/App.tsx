import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import SignInForm from "./_auth/forms/SignInForm"
import SignUpForm from "./_auth/forms/SignUpForm"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "@/components/ui/toaster"
import NotFound from "./components/ui/component/NotFound"
import { AllUsers, CreatePost, EditPost, Home, LikedPost, PostDetails, Profile, Saved } from "./_root/pages"

function App() {
  const router =createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route element={<AuthLayout/>}>
          <Route path="/sign-in" element={<SignInForm/>}/>
          <Route path="/sign-up" element={<SignUpForm/>}/>
      </Route>
      <Route element={<RootLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/saved" element={<Saved/>}/>
        <Route path="/create-post" element={<CreatePost/>}/>
        <Route path="/edit-post/:id" element={<EditPost/>}/>
        <Route path='/liked'element={<LikedPost/>}/>
        <Route path='/all-users'element={<AllUsers/>}/>
        <Route path='/profile/:id/*'element={<Profile/>}/>
        <Route path='/posts/:id'element={<PostDetails/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Route>
  ))
  return (
    <>
    <RouterProvider router={router}/>
      <Toaster/>
    </>
  )
}

export default App
