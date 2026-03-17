import { v4 } from "uuid";
import type { GroupSchema } from "../schema/GroupSchema";
import type { TaskSchema } from "../schema/TaskSchema";

export const GROUPS: GroupSchema[] = [
  {
    id: v4(),
    title: 'group1',
    totalTasks: 1,
    pending: 1,
    completed: 0
  },
  {
    id: v4(),
    title: 'group2',
    totalTasks: 2,
    pending: 2,
    completed: 0
  },
  {
    id: v4(),
    title: 'group3',
    totalTasks: 1,
    pending: 0,
    completed: 1
  },
  {
    id: v4(),
    title: 'group4',
    totalTasks: 2,
    pending: 1,
    completed: 1
  },
]

export const TASKS: TaskSchema[] = [
  {
    id: v4(),
    name: 'task1',
    description: 'description task1',
    isCompleted: false,
    groupId: GROUPS[0].id
  },
  {
    id: v4(),
    name: 'task2',
    description: 'description task2',
    isCompleted: true,
    groupId: GROUPS[2].id
  },
  {
    id: v4(),
    name: 'task3',
    description: 'description task3',
    isCompleted: false,
    groupId: GROUPS[3].id
  },
  {
    id: v4(),
    name: 'task4',
    description: 'description task4',
    isCompleted: true,
    groupId: GROUPS[2].id
  },
  {
    id: v4(),
    name: 'task5',
    description: 'description task5',
    isCompleted: false,
    groupId: GROUPS[0].id
  },
  {
    id: v4(),
    name: 'task6',
    description: 'description task6',
    isCompleted: true,
    groupId: GROUPS[1].id
  },
  {
    id: v4(),
    name: 'task7',
    description: 'description task7',
    isCompleted: false,
    groupId: GROUPS[2].id
  },
  {
    id: v4(),
    name: 'task8',
    description: 'description task8',
    isCompleted: false,
    groupId: GROUPS[3].id
  },
  {
    id: v4(),
    name: 'task9',
    description: 'description task9',
    isCompleted: true,
    groupId: GROUPS[0].id
  }
]
