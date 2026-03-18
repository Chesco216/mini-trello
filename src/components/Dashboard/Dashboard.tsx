import { useReducer, useState } from "react"
import { TaskContainer } from "../Tasks/TaskContainer"
import { getGroupInitialState, groupReducer } from "../Tasks/reducer/groupReducer"
import { GroupsDialog } from "../Tasks/components/GroupsDialog"

export const Dashboard = () => {

  const [groups, groupDispatch] = useReducer(groupReducer, getGroupInitialState())

  const [inputVal, setInputVal] = useState('')

  const handleCreateGroup = () => {
    groupDispatch({type: 'CREATE_GROUP', payload: inputVal})
    setInputVal('')
  }
  return (
    <div className="p-5 flex flex-row overflow-scroll gap-5"> 
      {
        groups.groups.map(group => {
          return <TaskContainer key={group.id} group={group}/>
        })
      }
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

