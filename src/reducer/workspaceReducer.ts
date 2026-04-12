
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
  uid: string
}
export type UpdateWorkspaceDTO = Partial<CreateWorkspaceDTO>

export interface GroupSchema {
  id: string,
  tasks: TaskSchema[]
  title: string,
  totalTasks: number,
  pending: number,
  completed: number
  workspaceId: string
}
export interface CreateGroupDTO {
  title: string,
  workspaceId: string
  uid: string
}
export type UpdateGroupDTO = Partial<CreateGroupDTO>

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

export interface CreateTaskDTO {
  uid: string
  name: string
  description: string
  personnel: string[]
  priority: "high" | "mid" | "low"
  groupId: string
  workspaceId: string
}
export type UpdateTaskDTO = Partial<CreateTaskDTO>

export type WorkspaceActions =
  { type: "CREATE_WORKSPACE", payload: CreateWorkspaceDTO } |
  { type: "DELETE_WORKSPACE", payload: string } |
  { type: "CREATE_GROUP", payload: CreateGroupDTO } |
  { type: "DELETE_GROUP", payload: string } |
  { type: "CREATE_TASK", payload: CreateTaskDTO } |
  { type: "UPTADE_TASK_STATUS", payload: { taskId: string, groupId: string, workspaceId: string, status: boolean } }

export const getWorkspacesInitialState = (): WorkspaceState => {
  return {
    workspaces: [],
    total: 0,
    active: 0,
    inactive: 0
  }
}

export const WorkspaceReducer = (state: WorkspaceState, action: WorkspaceActions): WorkspaceState => {

  switch (action.type) {
    case 'CREATE_WORKSPACE': {
      const newWorkspace: WorkspaceSchema = {
        id: action.payload.uid,
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
    }
    case 'DELETE_WORKSPACE': {
      //TODO: DELETE_WORKSPACE by inde
      //WARN: do not mutate the state
      return {
        workspaces: [],
        total: 0,
        active: 0,
        inactive: 0
      }
    }
    case "CREATE_GROUP": {
      const workspaceIndex = state.workspaces.findIndex((workspace) => workspace.id == action.payload.workspaceId)
      const newGroup: GroupSchema = {
        id: action.payload.uid,
        tasks: [],
        title: action.payload.title,
        totalTasks: 0,
        pending: 0,
        completed: 0,
        workspaceId: action.payload.workspaceId
      }
      return {
        ...state,
        workspaces: state.workspaces.map((workspace, index) =>
          index === workspaceIndex
            ? { ...workspace, groups: [...workspace.groups, newGroup] }
            : workspace
        )
      }
    }
    case "DELETE_GROUP":
      return state
    case "CREATE_TASK": {
      const workspaceIndex = state.workspaces.findIndex((workspace) => workspace.id == action.payload.workspaceId)
      const groupIndex = state.workspaces[workspaceIndex].groups.findIndex((group) => group.id === action.payload.groupId)
      const newTask: TaskSchema = {
        id: action.payload.uid,
        name: action.payload.name,
        description: action.payload.description,
        isCompleted: false,
        personnel: action.payload.personnel,
        createdAt: new Date(),
        priority: action.payload.priority,
        groupId: action.payload.groupId
      }
      return {
        ...state,
        workspaces: state.workspaces.map((workspace, index) =>
          index === workspaceIndex
            ? {
              ...workspace, groups: workspace.groups.map((group, index) =>
                index === groupIndex
                  ? {
                    ...group,
                    totalTasks: group.totalTasks + 1,
                    pending: group.pending + 1,
                    tasks: [...group.tasks, newTask]
                  }
                  : group
              )
            }
            : workspace
        )
      }
    }
    case "UPTADE_TASK_STATUS": {
      const workspaceIndex = state.workspaces.findIndex((workspace) => workspace.id == action.payload.workspaceId)
      const groupIndex = state.workspaces[workspaceIndex].groups.findIndex((group) => group.id === action.payload.groupId)
      const taskIndex = state.workspaces[workspaceIndex].groups[groupIndex].tasks.findIndex(task => task.id === action.payload.taskId)
      const updatesTask: TaskSchema = {
        ...state.workspaces[workspaceIndex].groups[groupIndex].tasks[taskIndex],
        isCompleted: action.payload.status
      }
      return {
        ...state,
        workspaces: state.workspaces.map((workspace, index) =>
          index === workspaceIndex
            ? {
              ...workspace, groups: workspace.groups.map((group, index) =>
                index === groupIndex
                  ? {
                    ...group,
                    totalTasks: group.totalTasks + 1,
                    pending: group.pending + 1,
                    tasks: group.tasks.map((task, index) =>
                      index === taskIndex
                        ? updatesTask
                        : task
                    )
                  }
                  : group
              )
            }
            : workspace
        )
      }
    }
    default:
      return state
  }
}
