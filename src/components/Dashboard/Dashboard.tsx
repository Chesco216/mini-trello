import { useEffect, useState } from "react"
import { TaskContainer } from "../Tasks/TaskContainer"
import { GroupsDialog } from "../Tasks/components/GroupsDialog"
import { DragDropProvider } from "@dnd-kit/react"
import { useNavigate, useParams } from "react-router"
import { useWorkspaces } from "../../context/workspaceContext"
import { BackArrowSVG } from "../SVGS/BackArrowSVG"

export const Dashboard = () => {

  const params = useParams<{ workspaceId: string }>()

  const navigate = useNavigate()

  const { state } = useWorkspaces()
  const workspace = state.workspaces.find((workspace) => workspace.id === params.workspaceId)
  const groups = state.workspaces.find((workspace) => workspace.id === params.workspaceId)?.groups

  return (
    <div className="p-5 flex flex-col h-screen overflow-scroll gap-5 scroll-none bg-linear-to-tr from-white to-bgslblue">
      <button
        className="cursor-pointer flex flex-row w-fit justify-center items-center underline text-lblue gap-1"
        onClick={() => navigate('/')}
      >
        <BackArrowSVG w={20} h={20} />
        back
      </button>
      <div>
        <h2 className="text-3xl font-bold xl:text-5xl xl:mb-5">{workspace?.name}</h2>

      </div>
      <section className="flex flex-row gap-8">
        {
          (groups) && (
            (groups.length > 0) &&
            groups.map(group => {
              return <TaskContainer key={group.id} group={group} />
            }))
        }
      </section>
      <button
        command="show-modal"
        commandfor='add-group'
        className="cursor-pointer h-fit w-fit p-5 flex flex-row bg-lblue text-white rounded-lg"
      >
        Add Group+
      </button>
      <GroupsDialog />
    </div>
  )
}

