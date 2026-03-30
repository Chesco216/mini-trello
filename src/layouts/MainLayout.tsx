import type { ReactNode } from "react"
import { Header } from "../components/Header/Header"
import { WorkspaceProvider } from "../context/context"

export const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="w-screen h-screen bg-white">
      <Header/>
      <WorkspaceProvider>
        {children}
      </WorkspaceProvider>
    </div>
  )
}

