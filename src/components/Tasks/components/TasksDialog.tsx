import React, { useRef, useState } from "react"
import { useParams } from "react-router"
import { v4 as uuid } from "uuid"
import type { CreateTaskDTO } from "../../../reducer/workspaceReducer"
import { useWorkspaces } from "../../../context/workspaceContext"
import { toast } from "sonner"

interface Props {
  groupId: string
}

export const TasksDialog = ({groupId}: Props) => {

  const {state, dispatch} = useWorkspaces()

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedMember, setSelectedMember] = useState<string>('')
  const [personnel, setPersonnel] = useState<string[]>([])
  const [priority, setPriority] = useState<"high" | "mid" | "low">(null)
  const [isEmpty, setIsEmpty] = useState(true)

  const dialogRef = useRef()
  const params = useParams<{workspaceId: string}>()
  const members = state.workspaces.find((workspace) => workspace.id === params.workspaceId)?.members

  const handleAddMember = () => {
    const isAdded = personnel.find((el) => el === selectedMember)
    if(isAdded) {
      toast.error('Member already added')
      return
    }
    if(selectedMember.length <= 0) {
      toast.error('selectedMember a valid member')
      return
    }
    setPersonnel((prev) => [...prev, selectedMember])
  }

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!priority) {
      toast.error('select priotiry')
      return
    }
    if(personnel?.length === 0) {
      toast.error('select at least 1 member for the task')
      return
    }
    const newTask: CreateTaskDTO = {
      uid: uuid(),
      name: name,
      description: description,
      groupId: groupId,
      personnel: personnel,
      priority: priority,
      workspaceId: params.workspaceId
    }
    dispatch({type: 'CREATE_TASK', payload: newTask})
    console.log({newTask})
    setName('')
    setDescription('')
    setSelectedMember('')
    setPersonnel([])
    dialogRef.current.close()
  }

  return (
    <dialog ref={dialogRef} id={`add-task-${groupId}`} className="absolute top-0 right-0 m-auto rounded-xl"  >
      <form 
        onSubmit={(e) => handleCreateTask(e)}
        className="flex flex-col p-10 box-border border-2 border-lblue rounded-xl"
      >
        <h3 className="flex justify-center pb-2 mb-5 font-bold text-lg text-black border-b border-lblue">Create Group</h3>
          <label className="flex flex-col mt-3 font-semibold text-md box-border text-black">
            Task Name
          <input 
            onChange={e => {
              if(e.target.value && description) {
                setIsEmpty(false)
              } else {
                setIsEmpty(true)
              }
              setName(e.target.value)
            }}
            value={name} 
            className="bg-bgslblue px-5 py-2 my-5 rounded-md font-light text-black" 
            type="text"
          />
        </label>
        <label className="flex flex-col font-semibold text-md box-border text-black">
          Task Description
          <input 
            onChange={e => {
              if(e.target.value && name) {
                setIsEmpty(false)
              } else {
                setIsEmpty(true)
              }
              setDescription(e.target.value)
            }}
            value={description} 
            className="bg-bgslblue px-5 py-2 my-5 rounded-md font-light text-black" 
            type="text"
          />
        </label>
        <label className="flex flex-col font-semibold gap-3">
          Select the team
        {
          <ul className="flex flex-wrap gap-2">
          {
            //FIX: not taking first member by default, taking null instead
          (personnel.length > 0) && 
            personnel.map((person) => 
                         <li className="flex flex-row text-md w-fit gap-2 border-1 border-lblue px-2 rounded-xl">{person}
                         <button 
                           type="button"
                           className="text-sm cursor-pointer" 
                           onClick={() => setPersonnel(personnel.filter((el) => el != person))}>
                           x
                           </button>
                         </li>)
          }
          </ul>
        }
          <select className="font-normal" required value={selectedMember} onChange={(e) => setSelectedMember(e.target.value)}>
          {
            (members?.length) && members.map((memmber) => <option>{memmber}</option>)
          }
          </select>
          <button type="button" onClick={handleAddMember}>Add</button>
        </label>
        <label className="flex flex-row justify-between my-5">
          Priority
          <select required value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value='high'>High</option>
            <option value='mid'>Medium</option>
            <option value='low'>Low</option>
          </select>
        </label>
        <button 
          disabled={isEmpty}
          type="submit"
          className="py-2 mb-5 w-full bg-lblue rounded-lg font-semibold text-white disabled:bg-gray-300 disabled:text-gray-500"
          commandfor={`add-task-${groupId}`} 
        >
        Create
        </button>
        <button 
          type="button"
          className="py-2 w-full bg-oblue rounded-lg font-semibold text-white"
          commandfor={`add-task-${groupId}`}
          command="close"
        >
          Close
        </button>
      </form>
    </dialog>
  )
}

