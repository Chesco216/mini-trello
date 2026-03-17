import type { ReactNode } from "react"
import { Header } from "../components/Header/Header"

export const MainLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>
    <Header/>
    {children}
    </div>
  )
}

