import { useState, type ActionDispatch } from "react"
import type { GroupSchema } from "./schema/GroupSchema"
import type { TaskSchema } from "./schema/TaskSchema"
import { TaskCard } from "./TaskCard"
import { TasksDialog } from "./components/TasksDialog"
import { v4 } from "uuid"
import { useDroppable } from "@dnd-kit/react"
import { useTasks } from "./reducer/TasksContext"
import { EmptyTasks } from "./components/EmptyTasks"
import type { GroupActions } from "./reducer/groupReducer"

export const TaskContainer = ({group, groupDispatch}: {group: GroupSchema, groupDispatch: ActionDispatch<[action: GroupActions]>}) => {

  const {ref} = useDroppable({
    id: group.id
  })

  const {tasks, taskDispatch} = useTasks()
  
  const [nameInput, setNameInput] = useState('')
  const [descriptionInput, setDescriptionInput] = useState('')

  const filteredTasks = tasks.tasks.filter(task => task.groupId === group.id)

  const handleCreateTask = () => {
    const newTask: TaskSchema = {
      id: v4(),
      name: nameInput,
      description: descriptionInput,
      isCompleted: false,
      groupId: group.id
    }
    taskDispatch({type: 'CREATE_TASK', payload: newTask})
    const completed = filteredTasks.filter(task => task.isCompleted).length
    groupDispatch({type: 'UPDATE_GROUP_STATUS', payload: {id: group.id, total: filteredTasks.length +1, completed: completed}})

    setNameInput('')
    setDescriptionInput('')
  }

  return (
    <div className="p-5 min-w-xs flex flex-col bg-gray-900 rounded-lg">
      <h3 className=" text-white font-semibold text-xl">{group.title}</h3>
      <div className="flex flex-row gap-2 mb-5">
        <p className="font-light text-gray-400">Total: {group.totalTasks}</p>
        <p className="font-light text-gray-400">Completed: {group.completed}</p>
        <p className="font-light text-gray-400">Pending: {group.pending}</p>
      </div>
      <div ref={ref}>
        {
          (filteredTasks.length) ? 
            filteredTasks.map(task => <TaskCard 
              key={task.id} 
              task={task} 
              groupDispatch={groupDispatch}
            />)
          : <EmptyTasks/>
        }
      </div>
      <button 
        command="show-modal"
        commandfor={`add-task-${group.id}`}
        className="h-fit w-fit py-2 px-5 flex flex-row bg-mist-400 text-white rounded-lg"
        >
        Create task +
      </button>
      <TasksDialog 
        groupId={group.id}
        handleClick={handleCreateTask} 
        nameInput={nameInput} 
        setNameInput={setNameInput}
        descriptionInput={descriptionInput}
        setDescriptionInput={setDescriptionInput}
      />
    </div>
  )
}

