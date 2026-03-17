import { useState } from "react"
import { GROUPS, TASKS } from "../Tasks/data/tasks"
import { TaskContainer } from "../Tasks/TaskContainer"
import type { GroupSchema } from "../Tasks/schema/GroupSchema"

export const Dashboard = () => {

  const [tasks, setTasks] = useState(TASKS)
  const [groups, setGroups] = useState(GROUPS)

  const handleCreateGroup = () => {
    console.log('create-group')
  }
  return (
    <div className="p-5 flex flex-row overflow-scroll gap-5"> 
      {
        groups.map(group => {
          const tasksFiltered = tasks.filter(task => task.groupId === group.id)
          const completedCounter = tasksFiltered.filter(task => task.isCompleted).length
          const newGroup: GroupSchema = {
            ...group,
            completed: completedCounter,
            totalTasks: tasksFiltered.length,
            pending: tasksFiltered.length - completedCounter
          }
          return <TaskContainer key={group.id} group={newGroup} tasks={tasks}/>
        })
      }
      <button 
        className="h-fit w-fit p-5 flex flex-row bg-gray-900 text-white rounded-lg"
        onClick={handleCreateGroup}
        >
        Add Group+
        </button>
    </div>
  )
}

