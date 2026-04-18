import { Header } from "../components/Header/Header"
import { WorkspaceProvider } from "../context/workspaceContext"
import { RouterProvider } from "react-router"
import { router } from "../routes/app.routes"
import { Toaster } from "sonner"

export const MainLayout = () => {
  return (
    <div className="w-screen h-screen bg-white box-border">
      <Toaster />
      <Header />
      <WorkspaceProvider>
        <RouterProvider router={router} />
      </WorkspaceProvider>
    </div>
  )
}

