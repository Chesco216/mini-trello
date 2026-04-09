import React, { useRef, useState } from "react"
import { useWorkspaces } from "../../../context/workspaceContext"
import { useParams } from "react-router"
import { v4 as uuid } from "uuid"

export const GroupsDialog = () => {

  const params = useParams()
  const {dispatch} = useWorkspaces()
  const groupDialogRef = useRef<HTMLDialogElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const uid = uuid()
    dispatch({type: 'CREATE_GROUP', payload: {title: inputVal, workspaceId: params.workspaceId, uid: uid}})
    groupDialogRef.current?.close()
    setInputVal('')
  }

  const [inputVal, setInputVal] = useState<string>()
  
  const [isEmpty, setIsEmpty] = useState(true)
  

  return (
    <dialog ref={groupDialogRef} id="add-group" className="absolute top-0 right-0 m-auto rounded-xl">
      <form 
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col p-10 box-border bg-white border-2 border-lblue rounded-xl">
        <h3 className="flex justify-center pb-2 mb-5 font-bold text-xl text-black border-b border-lblue">Create Group</h3>
        <label className="flex flex-col font-semibold text-md box-border text-black">
          Name
        <input 
        required
          onChange={e => {
            if(e.target.value) {
              setIsEmpty(false)
            } else {
              setIsEmpty(true)
            }
            setInputVal(e.target.value)
          }}
          value={inputVal} 
          className="bg-bgslblue px-5 py-2 my-5 rounded-md font-light text-black" 
          type="text"
        />
      </label>
        <button 
          disabled={isEmpty}
          type="submit"
          className="py-2 mb-5 w-full bg-lblue rounded-lg font-semibold text-white disabled:bg-gray-300 disabled:text-gray-500"
          commandfor="add-group" 
          command="close"
        >
        Create
        </button>
        <button 
          type="button"
          className="py-2 w-full bg-oblue rounded-lg font-semibold text-white"
          commandfor="add-group" 
          command="close"
        >
          Close
        </button>
      </form>
    </dialog>
  )
}

