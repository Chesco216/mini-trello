import {type Dispatch } from "react"
import { CheckSVG } from "../SVGS/CheckSVG"
import type { TaskSchema } from "./schema/TaskSchema"
import { useDraggable } from "@dnd-kit/react"
import type { GroupActions } from "./reducer/groupReducer"
import { useTasks } from "./reducer/TasksContext"

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
    <div ref={ref} className="p-0 flex flex-col mb-5 bg-slate-700 rounded-lg overflow-hidden"> 
      <div className="flex flex-row p-3 justify-between bg-slate-800">
        <h3 className="font-semibold text-white">{task.name}</h3>
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

