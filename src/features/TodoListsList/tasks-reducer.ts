import {
    addTodoListAC,
    removeTodoListAC,
    setTodoListsAC
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListAPI, UpdateTaskModelType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//variables
// const REMOVE_TASK = 'REMOVE_TASK'
// const ADD_TASK = 'ADD_TASK'
// const UPDATE_TASK = 'UPDATE_TASK'
// const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
// const ADD_TODOLIST = 'ADD_TODOLIST'
// const SET_TASKS = 'SET_TASKS'

const InitialState: TaskStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: InitialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todoId: string }>) {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todoId: string }>) {
            const tasks = state[action.payload.todoId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTaskAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todoId: string }>) {
            state[action.payload.todoId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todo.id] = []
        });
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.id]
        });

        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach((todo) => {
                state[todo.id] = []
            })
        });
    }
})

export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTaskAC} = slice.actions

// export const tasksReducer = (state: TaskStateType = InitialState, action: ActionsTypes) => {
//     switch (action.type) {
//         case REMOVE_TASK:
//             return {
//                 ...state, [action.todolistId]: [...state[action.todolistId].filter(task => task.id !== action.taskId)]
//             }
//         case ADD_TASK:
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
//         case UPDATE_TASK:
//             return {
//                 ...state, [action.todolistId]: state[action.todolistId]
//                     .map(task => task.id === action.taskId ? {...task, ...action.model} : task)
//             }
//         case addTodoListAC.type:
//             return {...state, [action.todo.id]: []}
//         case REMOVE_TODOLIST:
//             let stateCopy = {...state}
//             delete stateCopy[action.id]
//             return stateCopy
//         case 'SET_TODOLISTS': {
//             const stateCopy = {...state}
//             action.todoLists.forEach(tl => {
//                 stateCopy[tl.id] = [] // stateCopy -  ассоциативный массив
//             })
//             return stateCopy
//         }
//         case SET_TASKS:
//             return {...state, [action.todolistId]: action.tasks}
//         default:
//             return state
//     }
// }

//actions
// export const removeTaskAC = (taskId: string, todolistId: string) =>
//     ({type: 'REMOVE_TASK', taskId, todolistId} as const)
// export const addTaskAC = (task: TaskType) =>
//     ({type: 'ADD_TASK', task} as const)
// export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
//     ({type: 'UPDATE_TASK', taskId, model, todolistId} as const)
// export const setTaskAC = (tasks: Array<TaskType>, todolistId: string) =>
//     ({type: 'SET_TASKS', tasks, todolistId} as const)

//thunks
export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListAPI.getTask(todoId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTaskAC({tasks, todoId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const removeTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListAPI.deleteTask(todoId, taskId)
        .then(() => {
            dispatch(removeTaskAC({taskId, todoId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListAPI.createTask(todoId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const updateTaskTC = (todoId: string, domainModel: UpdateDomainTaskModelType, taskId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId, model: domainModel, todoId}))
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
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
type ThunkDispatch = Dispatch<SetAppStatusActionType | SetAppErrorActionType>

