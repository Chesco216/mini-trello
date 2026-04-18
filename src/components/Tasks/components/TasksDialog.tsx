import React, { useRef, useState } from "react"
import { useParams } from "react-router"
import { v4 as uuid } from "uuid"
import type { CreateTaskDTO } from "../../../reducer/workspaceReducer"
import { useWorkspaces } from "../../../context/workspaceContext"
import { toast } from "sonner"
import { CheckSVG } from "../../SVGS/CheckSVG"
import type { TaskSchema } from "../schema/TaskSchema"

interface Props {
  groupId: string
  task?: TaskSchema
}

export const TasksDialog = ({ groupId, task }: Props) => {

  const { state, dispatch } = useWorkspaces()

  // TODO: initialize states with task prop if exists
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [selectedMember, setSelectedMember] = useState<string>('')
  const [personnel, setPersonnel] = useState<string[]>([])
  const [priority, setPriority] = useState<"high" | "mid" | "low">(null)
  const [isEmpty, setIsEmpty] = useState(true)

  const dialogRef = useRef()
  const params = useParams<{ workspaceId: string }>()
  const members = state.workspaces.find((workspace) => workspace.id === params.workspaceId)?.members

  const handleAddMember = () => {
    const isAdded = personnel.find((el) => el === selectedMember)
    if (isAdded) {
      toast.error('Member already added')
      return
    }
    if (selectedMember.length <= 0) {
      toast.error('selectedMember a valid member')
      return
    }
    setPersonnel((prev) => [...prev, selectedMember])
  }

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!priority) {
      toast.error('select priotiry')
      return
    }
    if (personnel?.length === 0) {
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
    dispatch({ type: 'CREATE_TASK', payload: newTask })
    console.log({ newTask })
    setName('')
    setDescription('')
    setSelectedMember('')
    setPersonnel([])
    dialogRef.current.close()
  }

  return (
    <dialog
      ref={dialogRef}
      id={`add-task-${groupId}`}
      className="max-w-none max-h-none w-screen h-screen pt-8 absolute top-0 right-0 m-auto overflow-y-scroll
      xl:w-3xl xl:h-fit xl:rounded-xl xl:p-0 scroll-none
      "
    >
      <span className="hidden xl:flex xl:flex-row xl:justify-between xl:items-center xl:border-b border-gray-300 xl:px-10 xl:py-8">
        <h3 className="flex justify-center font-bold text-2xl text-lblue border-l-8 rounded-md px-5">Create Task</h3>
        <button
          className="text-2xl font-bold text-lblue"
          onClick={() => dialogRef.current.close()}
        >
          x
        </button>
      </span>
      <form
        id="create-task-form"
        onSubmit={(e) => handleCreateTask(e)}
        className="flex flex-col p-5 border-lblue rounded-xl xl:p-10"
      >
        <span className="xl:hidden flex flex-row justify-between items-center">
          <button
            type="button"
            commandfor={`add-task-${groupId}`}
            command="close"
            className="text-2xl font-semibold text-lblue">
            x
          </button>
          <h3 className="flex justify-center font-bold text-xl text-lblue">Create Task</h3>
          <button type="submit">
            <CheckSVG w={30} h={30} c="#3F51B5" />
          </button>
        </span>
        <label className="flex flex-col mt-10 font-semibold box-border xl:m-0">
          <legend className="font-bold text-gray-400 text-sm mb-2">
            TASK TITLE
          </legend>
          <input
            onChange={e => {
              if (e.target.value && description) {
                setIsEmpty(false)
              } else {
                setIsEmpty(true)
              }
              setName(e.target.value)
            }}
            value={name}
            className="bg-gray-200 px-5 py-4 rounded-md font-bold text-xl text-black"
            type="text"
          />
        </label>
        <label className="mt-10">
          <legend className="font-bold mb-2  text-gray-400 text-sm">
            Priority
          </legend>
          <ul className="flex flex-row gap-3">
            <li
              className={`flex flex w-fit px-5 py-3 row items-center border-1 rounded-md ${priority === 'high' ? 'font-semibold bg-purple-300 text-purple-700 border-purple-700' : ''}`}
              onClick={() =>
                setPriority(prev => {
                  return priority === 'high' ? '' : 'high'
                })
              }
            >
              High
            </li>
            <li
              className={`flex flex w-fit px-5 py-3 row items-center border-1 rounded-md ${priority === 'mid' ? 'font-semibold bg-purple-300 text-purple-700 border-purple-700' : ''}`}
              onClick={() =>
                setPriority(prev => {
                  return priority === 'mid' ? '' : 'mid'
                })
              }
            >
              Medium
            </li>
            <li
              className={`flex flex w-fit px-5 py-3 row items-center border-1 rounded-md ${priority === 'low' ? 'font-semibold bg-purple-300 text-purple-700 border-purple-700' : ''}`}
              onClick={() =>
                setPriority(prev => {
                  return priority === 'low' ? '' : 'low'
                })
              }
            >
              Low
            </li>
          </ul>
        </label>
        <label className="flex flex-col gap-3 mt-10">
          <legend className="font-bold text-gray-400 text-sm">
            Select the Team
          </legend>
          {
            <ul className="flex flex-wrap gap-2">
              {
                members?.map((person) =>
                  <li
                    className={`flex flex w-fit px-5 py-3 row items-center border-1 rounded-md ${personnel.includes(person) ? 'font-semibold bg-blue-200 text-blue-600 border-blue-500' : ''}`}
                    onClick={() =>
                      setPersonnel(prev => {
                        if (prev.includes(person))
                          return prev.filter(p => p != person)
                        return [...prev, person]

                      })
                    }
                  >
                    {person}
                  </li>)
              }
            </ul>
          }
        </label>
        <label className="flex flex-col mt-10 font-semibold box-border">
          <legend className="font-bold text-gray-400 text-sm mb-2">
            TASK DESCRIPTION
          </legend>
          <textarea
            onChange={e => {
              if (e.target.value && name) {
                setIsEmpty(false)
              } else {
                setIsEmpty(true)
              }
              setDescription(e.target.value)
            }}
            value={description}
            className="resize-y bg-gray-200 px-5 py-4 rounded-md font-light text-md text-black"
          />
        </label>
      </form>
      <div className="flex flex-col w-full p-6 h-full bg-gray-100">
        <button
          className="self-end py-2 px-5 font-bold text-white bg-lblue rounded-md"
          type="submit"
          form="create-task-form"
        >
          Create Task
        </button>
      </div>
    </dialog>
  )
}

