import type { GroupSchema } from "./schema/GroupSchema"
import { TasksDialog } from "./components/TasksDialog"
import { useWorkspaces } from "../../context/workspaceContext"
import { useParams } from "react-router"
import { TaskCard } from "./TaskCard"
import { useState, type DragEventHandler } from "react"
import type { TaskSchema } from "../../reducer/workspaceReducer"

interface Props {
  group: GroupSchema,
}

export const TaskContainer = ({ group }: Props) => {

  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [selectedTask, setSelectedTask] = useState<TaskSchema>()
  const params = useParams<{ workspaceId: string }>()

  const { state, dispatch } = useWorkspaces()

  const tasks = state.workspaces.find(
    (workspace) => workspace.id === params.workspaceId
  )?.groups.find(
    (g) => g.id === group.id
  )?.tasks

  const handleDragginOver = (e: DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: DragEvent) => {
    const data = e.dataTransfer?.getData('text/plain')
    if (data) {
      const formatedData = { ...JSON.parse(data), newGroupId: group.id }
      dispatch({ type: 'HANDLE_TASK_DND', payload: formatedData })
    }
  }

  const handleDeleteGroup = () => {
    if (confirm('Are you sure to delete this task?')) {
      if (params.workspaceId)
        dispatch({ type: "DELETE_GROUP", payload: { groupId: group.id, workspaceId: params.workspaceId } })
    }

  }

  return (
    <div
      onDragOver={handleDragginOver}
      onDrop={handleDrop}
      className="h-fit p-5 w-xs flex flex-col bg-white rounded-lg">
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
      <div
      >
        {
          (tasks) &&
          (tasks.length > 0) &&
          tasks.map(task => {
            return <TaskCard
              key={task.id}
              task={task}
              setIsUpdate={setIsUpdate}
              setSelectedTask={setSelectedTask}
            />
          })
        }
      </div>
      <div className="flex flex-row justify-between">
        <button
          onClick={() => setIsUpdate(false)}
          command="show-modal"
          commandfor={`add-task-${group.id}`}
          className="h-fit w-fit py-2 px-5 flex flex-row bg-oblue text-white rounded-lg"
        >
          Create task +
        </button>
        <button
          onClick={handleDeleteGroup}
          className="h-fit w-fit py-2 px-5 flex flex-row bg-red-500 text-white rounded-lg"
        >
          Delete group
        </button>
      </div>
      <TasksDialog task={selectedTask} isUpdate={isUpdate} groupId={group.id} />
    </div>
  )
}

