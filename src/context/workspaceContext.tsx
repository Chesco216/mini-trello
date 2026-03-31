import { createContext, useContext, useReducer, type ActionDispatch } from "react"
import { getWorkspacesInitialState, WorkspaceReducer, type WorkspaceActions, type WorkspaceState } from "../reducer/workspaceReducer"

export const WorkspaceContext = createContext<{state: WorkspaceState, dispatch: ActionDispatch<[action: WorkspaceActions]>}>()

export const WorkspaceProvider = ({children}: {children: React.ReactNode}) => {

  const [state, dispatch] = useReducer(WorkspaceReducer, getWorkspacesInitialState())

  return (
    <WorkspaceContext value={{state, dispatch}}>
      {children}
    </WorkspaceContext>
  )
}
export const useWorkspaces = () => useContext(WorkspaceContext)
