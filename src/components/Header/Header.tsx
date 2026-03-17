import { useState } from "react"
import { DisplayMenuSVG } from "../SVGS/DisplayMenuSVG"

export const Header = () => {
  const [project, setProject] = useState('My Project')

  return (
    <div className="p-6 flex items-center justify-center border-b border-slate-500">
      <h1 className="hidden md:flex md:bg-blue-300 ">My Dashboard</h1>
      <div className="flex flex-row gap-3 items-center">
        <select>
          <option>{project}</option>
          <option>{project}</option>
          <option>Crear nuevo</option>
        </select>
      </div>
    </div>
  )
}

