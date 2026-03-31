import React, { useRef, useState, type FormEventHandler } from "react"
import { MembersList } from "./MembersList"
import type { CreateWorkspaceDTO } from "../../../reducer/workspaceReducer"
import { toast } from "sonner"

interface Props {
  handleCreateWorkspace: (workspacedata: CreateWorkspaceDTO) => void
}

export const CreateWorkspaceDialog = ({handleCreateWorkspace}: Props) => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [members, setMembers] = useState([])
  const [owner, setOwner] = useState('')

  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleCreateWorkspace({name, description, members, owner})
    setOwner('')
    setMembers([])
    setDescription('')
    setName('')
    dialogRef.current?.close()
  }

  return (
    <dialog 
      ref={dialogRef}
      id="create-workspace"
      className="absolute top-0 right-0 m-auto rounded-xl" 
    >
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col py-5 px-8"
      >
        <h3 className="font-bold text-2xl text-lblue mb-3">Create Workspace</h3>
        <label className="flex flex-col text-lg text-gray-500 gap-3 mb-5">
          Workspace name
        <input 
          required
          className="w-full py-2 px-5 border-1 border-lblue rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        </label>
        <label className="flex flex-col text-lg text-gray-500 gap-3 mb-5">
          Description
        <input 
          required
          className="w-full py-2 px-5 border-1 border-lblue rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        </label>
        <MembersList members={members} setMembers={setMembers}/>
        {
          (members.length > 0) &&
            <>
          <label className="flex flex-col text-lg text-gray-500 gap-3 mb-5">
            Who is the owner?
            <select
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
              className="block bg-white text-lblue py-2 pl-4 mb-5 border-2 border-lblue rounded-lg"
            >
            <option></option>
            {
              members.map(member => 
                          <option
                          >
                          {member}
                          </option>)
            }
            </select>
            </label>
          </>
        }
        <div className="flex flex-row justify-around">
          <button 
            type="submit"
            className="bg-lblue font-semibold text-xl text-white py-3 px-6 rounded-xl"
          > 
            Create
          </button>
          <button 
            type="button"
            commandfor="create-workspace"
            command="close"
            className="border-3 border-lblue font-semibold text-xl text-lblue py-3 px-6 rounded-xl"
          > 
            Close
          </button>
        </div>
      </form>
    </dialog>
  )
}

