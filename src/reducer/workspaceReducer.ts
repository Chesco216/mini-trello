import { v4 as uuid} from "uuid"

export interface WorkspaceState {
  workspaces: WorkspaceSchema[]
  total: number
  active: number
  inactive: number
}

export interface WorkspaceSchema {
  id: string
  groups: GroupSchema[]
  name: string
  description: string
  members: string[]
  lastUpdate: Date | null
  owner: string
  isActive: boolean
}
export interface CreateWorkspaceDTO {
  name: string
  description: string
  members: string[]
  owner: string
}
type WorkspaceUpdateDTO = Partial<CreateWorkspaceDTO>

export interface GroupSchema {
  id: string,
  tasks: TaskSchema[]
  title: string,
  totalTasks: number,
  pending: number,
  completed: number
  workspaceId: string
}

export interface TaskSchema {
  id: string
  name: string
  description: string
  isCompleted: boolean
  personnel: string[]
  createdAt: Date
  priority: "high" | "mid" | "low"
  groupId: string
}

export type WorkspaceActions = 
  { type: "CREATE_WORKSPACE", payload: CreateWorkspaceDTO } |
  { type: "DELETE_WORKSPACE", payload: string } 

export const getWorkspacesInitialState = (): WorkspaceState => {
  return {
    workspaces: [],
    total: 0,
    active: 0,
    inactive: 0
  }
}

export const WorkspaceReducer = (state: WorkspaceState, action: WorkspaceActions): WorkspaceState => {

  switch(action.type) {
    case 'CREATE_WORKSPACE':
      const newWorkspace: WorkspaceSchema = {
        id: uuid(),
        groups: [],
        ...action.payload,
        lastUpdate: new Date,
        isActive: true
      }
      return {
        ...state,
        workspaces: [...state.workspaces, newWorkspace],
        total: state.total + 1,
        active: state.active + 1
      }
    case 'DELETE_WORKSPACE':
      return {
        workspaces: [],
        total: 0,
        active: 0,
        inactive: 0
      }
    default:
      return state
  }
}
