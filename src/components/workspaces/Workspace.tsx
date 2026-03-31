import { type CreateWorkspaceDTO } from "../../reducer/workspaceReducer";
import { useWorkspaces } from "../../context/workspaceContext";
import { WorkspaceCard } from "./components/WorkspaceCard";
import { CreateWorkspaceDialog } from "./components/CreateWorkspaceDialog";
import { toast } from "sonner";

export const Workspace = () => {

  const {state, dispatch} = useWorkspaces()

  const hanldeCreateWorkspace = (workspaceData: CreateWorkspaceDTO) => {
    console.log({workspaceData})
    dispatch({type: 'CREATE_WORKSPACE', payload: {...workspaceData}})
    toast.success('Workspace created')
  }

  return (
    <div className="flex flex-col p-5 gap-3">
      <h1 className="font-display flex flex-col font-extrabold text-4xl">Workspace Overview</h1>
      <p className="text-gray-500 text-lg">Create projects and organize tasks</p>
      <label className="flex flex-col items-center justify-center bg-lblue py-15 gap-2 rounded-xl">
        <button 
        commandfor="create-workspace"
        command="show-modal"
          className="h-fit w-fit py-2 px-4 font-semibold text-4xl text-white rounded-full bg-oblue"
          >
          +
        </button>
        <h3 className="font-bold text-lg text-white">Create a new Workspace</h3>
        <p className="font-light text-md text-white">Start a fresh Workspace</p>
      </label>
      {
        (state) && (
        state.workspaces.map(workspace => <WorkspaceCard 
                             key={workspace.id}
                             workspaceId={workspace.id}
                             name={workspace.name} 
                             description={workspace.description}
                             lastUpdated={workspace.lastUpdate}
                             />)
        )
      }
      <CreateWorkspaceDialog handleCreateWorkspace={hanldeCreateWorkspace}/>
    </div>
  )
}

