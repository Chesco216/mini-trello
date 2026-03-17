import React, { useState } from "react"
import { CheckSVG } from "../SVGS/CheckSVG"
import type { TaskSchema } from "./schema/TaskSchema"

export const TaskCard = ({task}: {task: TaskSchema}) => {

  const [isCompletedTask, setIsCompletedTask] = useState(task.isCompleted)
  const handleCompletedTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCompletedTask(e.target.checked)
    console.log('handle-completed-taak')
  }

  return (
    <div className="p-3 flex flex-col mb-5 bg-slate-700 rounded-lg"> 
      <div className="flex flex-row justify-between">
        <h3>{task.name}</h3>
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
        <div>
          <input type="checkbox" checked={isCompletedTask} onChange={handleCompletedTask}/>
        </div>
      </div>
        <p>{task.description}</p>
    </div>
  )
}

