import { v4 } from "uuid";
import type { GroupSchema } from "../schema/GroupSchema";

interface GroupsState {
 groups: GroupSchema[]
 total: number
}

type GroupActions =
  | { type: 'CREATE_GROUP', payload: string }
  | { type: 'UPDATE_GROUP', payload: string }

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

    default: 
      return state
  }
}
