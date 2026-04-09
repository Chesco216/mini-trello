import { type ReactNode } from "react"
import { useWorkspaces } from "../../context/workspaceContext"
import { Navigate, useParams } from "react-router"

interface Props {
  element: ReactNode
}

export const DashboardValidator = ({element}: Props) => {

  const {state} = useWorkspaces()
  const params = useParams<{workspaceId: string}>() 

  const workspace = state.workspaces.find((workspace) => workspace.id === params.workspaceId)

  if(workspace) {
    return element
  } else {
    return <Navigate to='/' replace/>
  }

}

