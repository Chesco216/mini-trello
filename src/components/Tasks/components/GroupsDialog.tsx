import { useState } from "react"

export const GroupsDialog = (
  {
    handleClick, 
    inputVal, 
    setInputVal
  }: 
  {
    handleClick: () => void, 
    inputVal: string, 
    setInputVal: React.Dispatch<React.SetStateAction<string>>
  }) => {

    const [isEmpty, setIsEmpty] = useState(true)

    return (
      <dialog id="add-group" className="absolute top-0 right-0 m-auto"  >
        <form 
          onSubmit={e => e.preventDefault()}
          className="flex flex-col p-10 box-border bg-gray-900 border-3 border-slate-500 rounded-xl">
          <h3 className="flex justify-center pb-2 mb-5 font-bold text-lg text-white border-b border-slate-500">Create Group</h3>
          <label className="flex flex-col font-semibold text-md box-border text-white">
            Name
          <input 
            onChange={e => {
              if(e.target.value) {
                setIsEmpty(false)
              } else {
                setIsEmpty(true)
              }
              setInputVal(e.target.value)
            }}
            value={inputVal} 
            className="bg-mist-200 px-5 py-2 my-5 rounded-md font-light text-black" 
            type="text"
          />
        </label>
          <button 
            disabled={isEmpty}
            type="button"
            className="py-2 mb-5 w-full bg-white rounded-lg font-semibold text-gray-900 disabled:bg-gray-300 disabled:text-gray-500"
            commandfor="add-group" 
            command="close"
            onClick={handleClick}
          >
          Create
          </button>
          <button 
            type="button"
            className="py-2 w-full bg-gray-700 rounded-lg font-semibold text-white"
            commandfor="add-group" 
            command="close"
          >
            Close
          </button>
        </form>
      </dialog>
    )
}

