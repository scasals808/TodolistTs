import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

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
export const getTasksTC = (todoId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    todoListAPI.getTask(todoId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC(tasks, todoId))
        })
}
export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    todoListAPI.deleteTask(todoId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todoId))
        })
}
export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch<ActionsTypes>) => {
    todoListAPI.createTask(todoId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const updateTaskTC = (todoId: string, domainModel: UpdateDomainTaskModelType, taskId: string) =>
    (dispatch: Dispatch<ActionsTypes>, getState: () => AppRootStateType) => {
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
            .then(() => {
                dispatch(updateTaskAC(taskId, domainModel, todoId))
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


