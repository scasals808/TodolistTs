import {TaskStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodoListsActionType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListAPI, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const SET_TASKS = 'SET_TASKS'

type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskId: string
    todolistId: string
}

type AddTaskActionType = {
    type: 'ADD_TASK'
    task: TaskType
}

type UpdateTaskActionType = {
    type: 'UPDATE_TASK'
    taskId: string
    model: UpdateDomainTaskModelType
    todolistId: string
}

// type ChangeTaskTitleActionType = {
//     type: 'CHANGE_TASK_TITLE',
//     taskId: string
//     title: string,
//     todolistId: string
// }

type  SetTaskActionType = {
    type: 'SET_TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsTypes = RemoveTaskActionType |
    AddTaskActionType |
    UpdateTaskActionType |
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodoListsActionType |
    SetTaskActionType

const InitialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = InitialState, action: ActionsTypes) => {
    switch (action.type) {
        case REMOVE_TASK:
            let newTodoList = [...state[action.todolistId].filter(task => task.id !== action.taskId)]
            return {...state, [action.todolistId]: newTodoList}
        case ADD_TASK:
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case UPDATE_TASK: {
             // state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            let newTodo = state[action.todolistId]
            let newTaskArray = newTodo.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            state[action.todolistId] = newTaskArray
            return ({...state})
        }
        case ADD_TODOLIST:
            return {
                ...state,
                [action.type]: []
            }
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
        case SET_TASKS: {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE_TASK', taskId, todolistId,}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD_TASK', task}
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE_TASK', taskId, model, todolistId}
}
export const setTaskAC = (tasks: Array<TaskType>, todolistId: string): SetTaskActionType => {
    return {type: 'SET_TASKS', tasks, todolistId}
}

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    todoListAPI.getTask(todoId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC(tasks, todoId))
        })
}

export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    todoListAPI.deleteTask(todoId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todoId))
        })
}

export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.createTask(todoId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (todoId: string, domainModel: UpdateDomainTaskModelType, taskId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoId].find(el => el.id === taskId)
        if( !task) {
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



