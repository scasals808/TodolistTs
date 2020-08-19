import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_TASK = 'CHANGE_TASK'
const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'

type RemoveTaskActionType = {
    type: 'REMOVE_TASK',
    taskId: string,
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD_TASK',
    title: string,
    todolistId: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK',
    taskId: string
    isDone: boolean,
    todolistId: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE',
    taskId: string
    title: string,
    todolistId: string
}

type ActionsTypes = RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskStatusActionType |
    ChangeTaskTitleActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

export const tasksReducer = (state: TaskStateType, action: ActionsTypes) => {
    switch (action.type) {
        case REMOVE_TASK:
            let newTodoList = [...state[action.todolistId].filter(task => task.id !== action.taskId)]
            return {...state, [action.todolistId]: newTodoList}
        case ADD_TASK:
            let newTask = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case CHANGE_TASK:
            return {
                ...state, [action.todolistId]: [...state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                })]
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        case ADD_TODOLIST:
            return {
                ...state,
                [action.todolistId]: []
            }
        case REMOVE_TODOLIST:
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            throw new Error('I dont understand this type')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, todolistId,}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD_TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE_TASK', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE_TASK_TITLE', taskId, title, todolistId}
}




