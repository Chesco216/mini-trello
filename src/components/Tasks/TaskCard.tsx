import type { TaskSchema } from "../../reducer/workspaceReducer"
import { MembersIcons } from "./components/MembersIcons"
import { useWorkspaces } from "../../context/workspaceContext"
import { useParams } from "react-router"
import { EditSVG } from "../SVGS/EditSVG"
import { type SetStateAction } from "react"
import type React from "react"
import { DeleteSVG } from "../SVGS/DeleteSVG"

interface Props {
  task: TaskSchema
  setIsUpdate: React.Dispatch<SetStateAction<boolean>>
  setSelectedTask: React.Dispatch<SetStateAction<TaskSchema | undefined>>
}

export const TaskCard = ({ task, setIsUpdate, setSelectedTask }: Props) => {

  const params = useParams<{ workspaceId: string }>()
  const { dispatch } = useWorkspaces()

  const handleCompletedTask = () => {
    if (params.workspaceId)
      dispatch({ type: 'UPTADE_TASK_STATUS', payload: { status: !task.isCompleted, workspaceId: params.workspaceId, groupId: task.groupId, taskId: task.id } })
  }

  const handleEditTask = () => {
    setIsUpdate(true)
    setSelectedTask(task)
  }

  const handleDeleteTask = () => {
    if (confirm('Are you sure to delete this task?')) {
      if (params.workspaceId)
        dispatch({ type: "DELETE_TASK", payload: { groupId: task.groupId, workspaceId: params.workspaceId, taskId: task.id } })
    }
  }

  const handleDragStart = (e: DragEvent) => {
    const formatedData = {
      workspaceId: params.workspaceId,
      oldGroupId: task.groupId,
      taskId: task.id
    }
    e.dataTransfer?.items.add(JSON.stringify(formatedData), 'text/plain')
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-0 flex flex-col mb-5 bg-blue-100 rounded-lg overflow-hidden"
    >
      <div className="flex flex-row justify-between p-3">
        {
          (task.priority === 'high') ? <label className="flex flex-row items-center w-fit bg-red-400 px-2 rounded-md">Urgent</label>
            : (task.priority === 'mid') ? <label className="flex flex-row items-center w-fit bg-amber-200 px-2 rounded-md">Moderate</label>
              : (task.priority === 'low') && <label className="flex flex-row items-center w-fit bg-green-300 px-2 rounded-md">Low</label>
        }
        <div className="flex flex-row gap-2.5">
          <button
            className="cursor-pointer"
            command='show-modal'
            // when clicking edit we always want the update dialog target
            commandfor={`update-task-${task.groupId}`}
            onClick={handleEditTask}
          >
            <EditSVG w={25} h={25} c="black" />
          </button>
          <button
            className="cursor-pointer"
            onClick={handleDeleteTask}
          >
            <DeleteSVG w={30} h={30} c="black" />
          </button>
        </div>
      </div>
      <div className="flex flex-row p-3 justify-between">
        <h3 className="font-semibold text-black font-semibold">{task.name}</h3>
        {
          (task.isCompleted) ?
            <p className="flex flex-row px-3 gap-2 items-center bg-green-300 text-green-700 rounded-md">
              completed
            </p>
            :
            <p className="flex flex-row px-3 gap-2 items-center bg-red-300 text-red-600 rounded-md">
              pending
            </p>
        }
      </div>
      <MembersIcons members={task.personnel} />
      <p className="p-5">{task.description}</p>
      {
        (task.isCompleted) ?
          <button
            className="w-fit mb-5 mr-2.5 self-end bg-red-500 py-2 px-5 rounded-lg text-white font-semibold"
            onClick={() => handleCompletedTask()}
          >
            Mark pending
          </button>
          :
          <button
            className="w-fit mb-5 mr-2.5 self-end bg-green-500 py-2 px-5 rounded-lg text-white font-semibold"
            onClick={() => handleCompletedTask()}
          >
            Mark as done
          </button>
      }
    </div >
  )
}
// })
