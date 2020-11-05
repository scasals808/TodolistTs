import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {log} from "util";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

//variables
const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const SET_TASKS = 'SET_TASKS'

const InitialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = InitialState, action: ActionsTypes) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state, [action.todolistId]: [...state[action.todolistId].filter(task => task.id !== action.taskId)]
            }
        case ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case UPDATE_TASK:
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
            }
        case ADD_TODOLIST:
            return {...state, [action.todo.id]: []}
        case REMOVE_TODOLIST:
            let stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        case 'SET_TODOLISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = [] // stateCopy -  ассоциативный массив
            })
            return stateCopy
        }
        case SET_TASKS:
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE_TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD_TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE_TASK', taskId, model, todolistId} as const)
export const setTaskAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET_TASKS', tasks, todolistId} as const)

//thunks
export const getTasksTC = (todoId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.getTask(todoId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC(tasks, todoId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.deleteTask(todoId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todoId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTaskTC = (todoId: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.createTask(todoId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todoId: string, domainModel: UpdateDomainTaskModelType, taskId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoId].find(el => el.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }

        todoListAPI.updateTask(todoId, taskId, apiModel)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todoId))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }

//types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionsTypes = ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof updateTaskAC> |
    ReturnType<typeof setTaskAC> |
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodoListsActionType
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
type ThunkDispatch = Dispatch<ActionsTypes | SetAppStatusActionType | SetAppErrorActionType>

