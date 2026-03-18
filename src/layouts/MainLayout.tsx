import type { ReactNode } from "react"
import { Header } from "../components/Header/Header"

export const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="w-screen h-screen bg-gray-700">
      <Header/>
      {children}
    </div>
  )
}

