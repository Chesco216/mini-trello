import { useState } from "react"
import type { GroupSchema } from "./schema/GroupSchema"
import type { TaskSchema } from "./schema/TaskSchema"
// import { TaskCard } from "./TaskCard"
import { TasksDialog } from "./components/TasksDialog"
import { v4 } from "uuid"
import { useDroppable } from "@dnd-kit/react"
// import { EmptyTasks } from "./components/EmptyTasks"
import { useWorkspaces } from "../../context/workspaceContext"
import { useParams } from "react-router"
import { TaskCard } from "./TaskCard"
import { EmptyTasks } from "./components/EmptyTasks"

interface Props {
  group: GroupSchema,
}

export const TaskContainer = ({ group }: Props) => {

  const params = useParams<{workspaceId: string}>()

  const {ref} = useDroppable({
    id: group.id
  })

  const {state, dispatch} = useWorkspaces()

  const tasks = state.workspaces.find(
      (workspace) => workspace.id === params.workspaceId
    )?.groups.find(
        (g) => g.id === group.id
      )?.tasks
  
  return (
    <div className="p-5 min-w-xs flex flex-col bg-bgtgray rounded-lg">
      <h3 className=" text-black font-semibold text-xl mb-3">{group.title}</h3>
      {
        (tasks) &&
          (tasks.length > 0) &&
            <div className="flex flex-row gap-2 mb-5">
              <p className="font-light text-gray-400">Total: {group.totalTasks}</p>
              <p className="font-light text-gray-400">Completed: {group.completed}</p>
              <p className="font-light text-gray-400">Pending: {group.pending}</p>
            </div>
      }
      <div ref={ref}>
        {
          (tasks) &&
            (tasks.length > 0) &&
              tasks.map(task => <TaskCard 
                key={task.id} 
                task={task} 
              />)
        }
      </div>
      <button 
        command="show-modal"
        commandfor={`add-task-${group.id}`}
        className="h-fit w-fit py-2 px-5 flex flex-row bg-oblue text-white rounded-lg"
        >
        Create task +
      </button>
      <TasksDialog groupId={group.id}/>
    </div>
  )
}

