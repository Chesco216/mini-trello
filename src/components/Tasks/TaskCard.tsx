import type { TaskSchema } from "../../reducer/workspaceReducer"
import { CheckSVG } from "../SVGS/CheckSVG"
import { useDraggable } from "@dnd-kit/react"

export const TaskCard = (
  {
    task, 
    // groupDispatch
  }: 
  {
    task: TaskSchema, 
    // groupDispatch: Dispatch<GroupActions>
  }) => {
  
  // const {tasks, taskDispatch} = useTasks()
  
  const {ref} = useDraggable({
    id: task.id
  })

  const handleCompletedTask = (status: boolean) => {
    console.log({task})
    // taskDispatch({type: 'UPDATE_COMPLETED', payload: {id: task.id, status}})
    // if(status) {
    //   const completed = tasks.tasks.filter(task => task.groupId === task.groupId && task.isCompleted).length + 1
    //   groupDispatch({type: 'UPDATE_GROUP_STATUS', payload:{id: task.groupId, completed: completed, total: tasks.tasks.length}})
    // } else {
    //   const completed = tasks.tasks.filter(task => task.groupId === task.groupId && task.isCompleted).length
    //   groupDispatch({type: 'UPDATE_GROUP_STATUS', payload:{id: task.groupId, completed: completed, total: tasks.tasks.length}})
    // }
  }

  return (
    <div ref={ref} className="p-0 flex flex-col mb-5 bg-white rounded-lg overflow-hidden"> 
    {
      (task.priority === 'high')? <label className="flex w-fit bg-red-400 m-2 py-1 px-2 rounded-md">Urgent</label>
      : (task.priority === 'mid')? <label className="flex w-fit m-2 bg-amber-200 py-1 px-2 rounded-md">Moderate</label>
      : (task.priority === 'low') && <label className="flex w-fit m-2 bg-green-300 py-1 px-2 rounded-md">Low</label>
    }
      <div className="flex flex-row p-3 justify-between bg-white">
        <h3 className="font-semibold text-black font-semibold">{task.name}</h3>
        {
          (task.isCompleted) ?
            <p className="flex flex-row gap-2 items-center text-green-700">
            completed

              <CheckSVG w={20} h={20}/>
            </p>
            :
            <p className="flex flex-row gap-2 items-center text-red-400">
            pending ...
            </p>
        }
      </div>
        <p className="p-5">{task.description}</p>
        {
          (task.isCompleted) ?
            <button
              className="w-fit mb-5 ml-[40%] bg-red-500 py-2 px-5 rounded-lg text-white font-semibold" 
              onClick={() => handleCompletedTask(false)}
            >
              Mark pending
            </button>
            :
            <button
              className="w-fit mb-5 ml-[40%] bg-slate-800 py-2 px-5 rounded-lg text-white font-semibold" 
              onClick={() => handleCompletedTask(true)}
            >
              Mark as done
            </button>
        }
    </div>
  )
}

