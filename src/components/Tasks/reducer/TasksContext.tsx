import React, { createContext, useContext, useReducer, type ActionDispatch } from "react"
import { getTaskInitialState, taskReducer, type TaskActions, type TasksState } from "./taskReducer"

export const TasksContext = createContext<{tasks: TasksState, taskDispatch: ActionDispatch<[action: TaskActions]>}>()

export const TaskProvider = ({children}: {children: React.ReactNode}) => {

  const [tasks, taskDispatch] = useReducer(taskReducer, getTaskInitialState())

  return (
    <TasksContext.Provider value={{tasks, taskDispatch}}>
      {children}
    </TasksContext.Provider>
  )
}
export const useTasks = () => useContext(TasksContext)
