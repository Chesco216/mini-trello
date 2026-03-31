import { useState } from "react"
import { TaskContainer } from "../Tasks/TaskContainer"
import { GroupsDialog } from "../Tasks/components/GroupsDialog"
import { DragDropProvider } from "@dnd-kit/react"
import { useParams } from "react-router"
import { useWorkspaces } from "../../context/workspaceContext"
import type { GroupSchema } from "../../reducer/workspaceReducer"

export const Dashboard = () => {

  const params = useParams<{workspaceId: string}>()
  console.log({params});

  
  const {state, dispatch} = useWorkspaces()
  const groups: GroupSchema[] = state.workspaces.filter((workspace) => workspace.id === params.workspaceId)
  console.log({groups: groups.length})

  //TODO: Use workspace reducen instead
  // const [groups, groupDispatch] = useReducer(groupReducer, getGroupInitialState())
  // const {tasks, taskDispatch} = useTasks()

  const [inputVal, setInputVal] = useState('')

  const handleCreateGroup = () => {
    dispatch({type: 'CREATE_GROUP', payload: {title: inputVal, workspaceId: params.workspaceId}})
    setInputVal('')
    console.log({state})
  }

  const handleDragDropAction =({source, target}) => {
    // const taskDragged = tasks.tasks.filter(task => task.name === source.id)
    // if (taskDragged)
    //   taskDispatch({type: 'TOGGLE_GROUP', payload: {id: source.id, groupId: target.id}})
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
          (groups.length > 0)? 
          groups.map(group => {
            return <TaskContainer key={group.id} group={group}/>
          })
          :
            <div>No Groups yet</div>
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

