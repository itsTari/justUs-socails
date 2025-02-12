import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import SignInForm from "./_auth/forms/SignInForm"
import SignUpForm from "./_auth/forms/SignUpForm"
import Home from "./_root/pages/Home"
import AuthLayout from "./_auth/AuthLayout"
import RootLayout from "./_root/RootLayout"
import { Toaster } from "@/components/ui/toaster"
import NotFound from "./components/ui/component/NotFound"

function App() {
  const router =createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route element={<AuthLayout/>}>
          <Route path="/sign-in" element={<SignInForm/>}/>
          <Route path="/sign-up" element={<SignUpForm/>}/>
      </Route>
      <Route element={<RootLayout/>}>
        <Route index element={<Home/>}/>
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
