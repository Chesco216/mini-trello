import { v4 } from "uuid";
import type { GroupSchema } from "../schema/GroupSchema";

interface GroupsState {
 groups: GroupSchema[]
 total: number
}

export type GroupActions =
  | { type: 'CREATE_GROUP', payload: string }
  | { type: 'UPDATE_GROUP_STATUS', payload: {id: string, total: number, completed: number} }

export const getGroupInitialState = (): GroupsState => {
  return {
    groups: [],
    total: 0
  }
}

export const groupReducer = (state: GroupsState, action: GroupActions): GroupsState => {

  switch(action.type) {
    case 'CREATE_GROUP':
      const newGroup: GroupSchema = {
        id: v4(),
        title: action.payload,
        totalTasks: 0,
        pending: 0,
        completed: 0
      }
      return {
        ...state,
        groups: [...state.groups, newGroup],
        total: state.total + 1
      }

      case 'UPDATE_GROUP_STATUS':
        const groupToUpdate: GroupSchema = state.groups.find(group => group.id === action.payload.id)
        if (!groupToUpdate) return {...state}
        const updatedGroups = state.groups.filter(group => group.id != action.payload.id)
        const renewedGroup: GroupSchema = {
          ...groupToUpdate,
          totalTasks: action.payload.total,
          completed: action.payload.completed,
          pending: action.payload.total - action.payload.completed
        }
        return {
          ...state,
          groups: [...updatedGroups, renewedGroup]
        }

    default: 
      return state
  }
}
