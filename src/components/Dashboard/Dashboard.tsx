import { useReducer, useState } from "react"
import { TaskContainer } from "../Tasks/TaskContainer"
import { getGroupInitialState, groupReducer } from "../Tasks/reducer/groupReducer"
import { GroupsDialog } from "../Tasks/components/GroupsDialog"
import { DragDropProvider } from "@dnd-kit/react"
import { useTasks } from "../Tasks/reducer/TasksContext"

export const Dashboard = () => {

  const [groups, groupDispatch] = useReducer(groupReducer, getGroupInitialState())
  const {tasks, taskDispatch} = useTasks()

  const [inputVal, setInputVal] = useState('')

  const handleCreateGroup = () => {
    groupDispatch({type: 'CREATE_GROUP', payload: inputVal})
    setInputVal('')
  }

  const handleDragDropAction =({source, target}) => {
    const taskDragged = tasks.tasks.filter(task => task.name === source.id)
    if (taskDragged)
      taskDispatch({type: 'TOGGLE_GROUP', payload: {id: source.id, groupId: target.id}})
  }

  return (
    <div className="p-5 flex flex-row overflow-scroll gap-5 scroll-none"> 
      <DragDropProvider
        onDragEnd={(event) => {
          const {target} = event.operation
          const {source} = event.operation
          if (target && source) {
            handleDragDropAction({source, target})
          }
        }}
      >
        {
          groups.groups.map(group => {
            return <TaskContainer key={group.id} group={group} groupDispatch={groupDispatch}/>
          })
        }
      </DragDropProvider>
      <button 
        command="show-modal"
        commandfor='add-group'
        className="h-fit w-fit p-5 flex flex-row bg-gray-900 text-white rounded-lg"
        >
        Add Group+
      </button>
      <GroupsDialog handleClick={handleCreateGroup} inputVal={inputVal} setInputVal={setInputVal}/>
    </div>
  )
}

