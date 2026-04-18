import type { TaskSchema } from "../../reducer/workspaceReducer"
import { useDraggable } from "@dnd-kit/react"
import { MembersIcons } from "./components/MembersIcons"
import { useWorkspaces } from "../../context/workspaceContext"
import { useParams } from "react-router"
import { EditSVG } from "../SVGS/EditSVG"
import { UpdateTaskDialog } from "./components/UpdateTaskDialog"

interface Props {
  task: TaskSchema
}

// export const TaskCard = memo(function TCard({ task }: Props) {
export const TaskCard = ({ task }: Props) => {

  const { ref } = useDraggable({
    id: task.id
  })

  const params = useParams<{ workspaceId: string }>()
  const { dispatch } = useWorkspaces()

  const handleCompletedTask = () => {
    dispatch({ type: 'UPTADE_TASK_STATUS', payload: { status: !task.isCompleted, workspaceId: params.workspaceId, groupId: task.groupId, taskId: task.id } })
  }

  const handleEditTask = () => {
    console.log('edit task' + task.id)
  }

  return (
    <div ref={ref} className="p-0 flex flex-col mb-5 bg-blue-300 rounded-lg overflow-hidden">
      <div className="flex flex-row justify-between p-3">
        {
          (task.priority === 'high') ? <label className="flex w-fit bg-red-400 px-2 rounded-md">Urgent</label>
            : (task.priority === 'mid') ? <label className="flex w-fit bg-amber-200 px-2 rounded-md">Moderate</label>
              : (task.priority === 'low') && <label className="flex w-fit bg-green-300 px-2 rounded-md">Low</label>
        }
        <button
          command='show-modal'
          commandfor={`update-task-${task.id}`}
          onClick={handleEditTask}
        >
          <EditSVG w={25} h={25} c="black" />
        </button>
      </div>
      <div className="flex flex-row p-3 justify-between">
        <h3 className="font-semibold text-black font-semibold">{task.name}</h3>
        <MembersIcons members={task.personnel} />
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
      <p className="p-5">{task.description}</p>
      {
        (task.isCompleted) ?
          <button
            className="w-fit mb-5 ml-[40%] bg-red-500 py-2 px-5 rounded-lg text-white font-semibold"
            onClick={() => handleCompletedTask()}
          >
            Mark pending
          </button>
          :
          <button
            className="w-fit mb-5 ml-[40%] bg-green-500 py-2 px-5 rounded-lg text-white font-semibold"
            onClick={() => handleCompletedTask()}
          >
            Mark as done
          </button>
      }
      <UpdateTaskDialog taskId={task.id} />
    </div>
  )
}
// })
