import { type CreateWorkspaceDTO } from "../../reducer/workspaceReducer";
import { useWorkspaces } from "../../context/context";
import { WorkspaceCard } from "./components/WorkspaceCard";

export const Workspace = () => {

  const {state, dispatch} = useWorkspaces()
  const hanldeCreateWorkspace = () => {
    console.log('Workspace created');
    const newWorkspace: CreateWorkspaceDTO= {
      name: 'pipipi',
      description: 'description pipipi',
      members: ['me', 'you'],
      owner: 'me'
    }
    dispatch({type: 'CREATE_WORKSPACE', payload: newWorkspace})
  }

  return (
    <div className="flex flex-col p-5 gap-3">
      <h1 className="font-display flex flex-col font-bold text-4xl">Workspace Overview</h1>
      <p className="text-gray-500 text-lg">Create projects and organize tasks</p>
      <label className="flex flex-col items-center justify-center bg-lblue py-15 gap-2 rounded-xl">
        <button onClick={hanldeCreateWorkspace} className="h-fit w-fit py-2 px-4 font-semibold text-4xl text-white rounded-full bg-oblue">+</button>
        <h3 className="font-bold text-lg text-white">Create a new Workspace</h3>
        <p className="font-light text-md text-white">Start a fresh Workspace</p>
      </label>
      {
        state.workspaces.map(workspace => <WorkspaceCard 
                             name={workspace.name} 
                             description={workspace.description}
                             lastUpdated={workspace.lastUpdate}
                             />)
      }
    </div>
  )
}

