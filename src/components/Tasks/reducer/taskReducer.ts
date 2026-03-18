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

export const taskReducer = (state: TasksState, action: TaskActions): TasksState => {

  switch(action.type) {
    case 'CREATE_TASK':
      return {
      ...state,
      tasks: [...state.tasks, action.payload],
      total: state.total + 1
    }

    default:
      return state
  }

}
