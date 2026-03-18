import type { TaskSchema } from "../schema/TaskSchema"

export interface TasksState {
  tasks: TaskSchema[]
  total: number
  completed: number
  pending: number
}

export const getTaskInitialState = (): TasksState => {
  return {
    tasks: [],
    total: 0,
    completed: 0,
    pending: 0
  }
}

export type TaskActions =
  | {type: 'CREATE_TASK', payload: TaskSchema}
  | {type: 'UPDATE_COMPLETED', payload: {status: boolean, id: string}}
  | {type: 'TOGGLE_GROUP', payload: {id: string, groupId: string}}

export const taskReducer = (state: TasksState, action: TaskActions): TasksState => {

  switch(action.type) {
    case 'CREATE_TASK':
      return {
      ...state,
      tasks: [...state.tasks, action.payload],
      total: state.total + 1
    }

    case "UPDATE_COMPLETED":
      const updatedTask = state.tasks.find(task => task.id === action.payload.id)
      if(!updatedTask) return{...state}
      const filteredTasks = state.tasks.filter(task => task.id != action.payload.id)
      const completedTask: TaskSchema = {
        ...updatedTask,
        isCompleted: action.payload.status
      }
      return {
      ...state,
      tasks: [...filteredTasks, completedTask]
    }

    case "TOGGLE_GROUP":
      const selectedTask = state.tasks.find(task => task.id === action.payload.id)
      if(!selectedTask) return{...state}
      const filteredGroupTasks = state.tasks.filter(task => task.id != action.payload.id)
      const newGroupTask: TaskSchema = {
        ...selectedTask,
        groupId: action.payload.groupId
      }
      return {
        ...state,
        tasks: [...filteredGroupTasks, newGroupTask]
      }

    default:
      return state
  }

}
