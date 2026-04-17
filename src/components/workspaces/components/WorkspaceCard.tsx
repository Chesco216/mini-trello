import { useNavigate } from "react-router"
import type { WorkspaceSchema } from "../../../reducer/workspaceReducer"
import { ClockSVG } from "../../SVGS/ClockSVG"
import { useEffect, useState } from "react"
import { MembersList } from "./MembersList"
import { MembersIcons } from "../../Tasks/components/MembersIcons"
import { getLastUpdated } from "../../../common/actions/get-last-updated"

interface Props {
  workspace: WorkspaceSchema
}

export const WorkspaceCard = ({ workspace }: Props) => {

  const [updatedTime, setUpdatedTime] = useState('')
  const navigate = useNavigate()
  const { name, description, lastUpdate, id, isActive } = workspace

  const handleClick = () => {
    navigate(`/dashboard/${id}`)
  }
  const now = new Date().getTime()
  const last = lastUpdate ? lastUpdate.getTime() : new Date().getTime()
  const lastWorkspaceUpdate = now - last

  useEffect(() => {
    setUpdatedTime(getLastUpdated(lastWorkspaceUpdate))
  }, [updatedTime])

  return (
    <div
      onClick={handleClick}
      className="flex flex-col bg-lblue gap-2 rounded-xl overflow-hidden xl:w-md"
    >
      <h3 className="flex flex-row w-full p-5 justify-between items-center font-bold text-lg text-white">
        {name}
        <label className="bg-purple-400 rounded-md text-purple-900 px-2">{(isActive) ? 'active' : 'inactive'}</label>
      </h3>
      <span className="flex flex-col gap-5 p-5 bg-bgtgray">
        <p className="flex flex-col font-light font-semibold text-md ">{description}</p>
        <p className="flex flex-row gap-4">Colaborators: <MembersIcons members={workspace.members} /></p>

        <label className="flex flex-row mt-3 items-center gap-1 w-fit bg-gray-300 text-gray-500 self-end rounded-md px-2">
          <ClockSVG w={15} h={15} c="oklch(55.1% 0.027 264.364)" />
          {updatedTime}
        </label>
      </span>
    </div>
  )
}

