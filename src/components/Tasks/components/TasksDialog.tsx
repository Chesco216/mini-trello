import { useState } from "react"

export const TasksDialog = (
  {
    groupId,
    handleClick, 
    nameInput, 
    setNameInput, 
    descriptionInput, 
    setDescriptionInput,
  }: 
  {
    groupId: string,
    handleClick: () =>  void, 
    nameInput: string, 
    setNameInput: React.Dispatch<React.SetStateAction<string>>
    descriptionInput: string, 
    setDescriptionInput: React.Dispatch<React.SetStateAction<string>>
  }) => {

    const [isEmpty, setIsEmpty] = useState(true)

    return (
      <dialog id={`add-task-${groupId}`} className="absolute top-0 right-0 m-auto"  >
        <form className="flex flex-col p-10 box-border bg-gray-900 border-3 border-slate-500 rounded-xl">
          <h3 className="flex justify-center pb-2 mb-5 font-bold text-lg text-white border-b border-slate-500">Create Group</h3>
            <label className="flex flex-col mt-3 font-semibold text-md box-border text-white">
              Task Name
            <input 
              onChange={e => {
                if(e.target.value && descriptionInput) {
                  setIsEmpty(false)
                } else {
                  setIsEmpty(true)
                }
                setNameInput(e.target.value)
              }}
              value={nameInput} 
              className="bg-mist-200 px-5 py-2 my-5 rounded-md font-light text-black" 
              type="text"
            />
          </label>
          <label className="flex flex-col mb-5 font-semibold text-md box-border text-white border-b border-slate-500">
            Task Description
            <input 
              onChange={e => {
                if(e.target.value && nameInput) {
                  setIsEmpty(false)
                } else {
                  setIsEmpty(true)
                }
                setDescriptionInput(e.target.value)
              }}
              value={descriptionInput} 
              className="bg-mist-200 px-5 py-2 mt-5 mb-10 rounded-md font-light text-black" 
              type="text"
            />
          </label>
          <button 
            disabled={isEmpty}
            type="button"
            className="py-2 mb-5 w-full bg-white rounded-lg font-semibold text-gray-900 disabled:bg-gray-300 disabled:text-gray-500"
            commandfor={`add-task-${groupId}`} 
            command="close"
            onClick={handleClick}
          >
          Create
          </button>
          <button 
            type="button"
            className="py-2 w-full bg-gray-700 rounded-lg font-semibold text-white"
            commandfor={`add-task-${groupId}`}
            command="close"
          >
            Close
          </button>
        </form>
      </dialog>
    )
}

