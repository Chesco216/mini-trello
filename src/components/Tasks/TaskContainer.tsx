import type { GroupSchema } from "./schema/GroupSchema"
import type { TaskSchema } from "./schema/TaskSchema"
import { TaskCard } from "./TaskCard"

export const TaskContainer = ({tasks, group}: {tasks: TaskSchema[], group: GroupSchema}) => {

  const containerTasks = tasks.filter(task => task.groupId === group.id)
  console.log(containerTasks)

  const handleCreateTask = () => {
    console.log('create-task')
  }
  return (
    <div className="p-5 min-w-xs flex flex-col bg-gray-900 rounded-lg">
    <h3 className=" text-white font-semibold text-xl">{group.title}</h3>
    <div className="flex flex-row gap-2 mb-5">
      <p className="font-light text-gray-400">Total: {group.totalTasks}</p>
      <p className="font-light text-gray-400">Completed: {group.completed}</p>
      <p className="font-light text-gray-400">Pending: {group.pending}</p>
    </div>
    {
      containerTasks.map(task => <TaskCard key={task.id} task={task}/>)
    }
    <button 
      className="h-fit w-fit py-2 px-5 flex flex-row bg-mist-400 text-white rounded-lg"
      onClick={handleCreateTask}
      >
      Create task +
      </button>
    </div>
  )
}

