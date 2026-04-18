import { useState } from "react"
import { GridSVG } from "../SVGS/GridSVG"
import { ProfileSVG } from "../SVGS/ProfileSVG"
import { SearchSVG } from "../SVGS/SearchSVG"

export const Header = () => {
  const [project, setProject] = useState('My Project')

  return (
    <header className="px-8 py-6 flex items-center justify-between">
      <div className="flex flex-row items-center gap-5">
        <GridSVG w={30} h={30} />
        <label className="font-bold text-xl text-lblue ">TROLLO</label>
      </div>
      <div className="flex flex-row gap-3 items-center gap-5">
        <SearchSVG w={22} h={22} />
        <ProfileSVG w={20} h={20} />
      </div>
    </header>
  )
}

