import {todoListAPI, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

//variables
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
const SET_TODOLISTS = 'SET_TODOLISTS'
const CHANGE_TODOLIST_ENTITY_STATUS = 'CHANGE_TODOLIST_ENTITY_STATUS'

const InitialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = InitialState, action: ActionsTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.id)
        case ADD_TODOLIST:
            return [{...action.todo, filter: 'all', entityStatus: 'idle'}, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
        case CHANGE_TODOLIST_FILTER:
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        case CHANGE_TODOLIST_ENTITY_STATUS:
            return state.map(todo => todo.id === action.id ? {...todo, entityStatus: action.status} : todo)
        case SET_TODOLISTS:
            return action.todoLists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
        default:
            return state
    }
}

//actions
export const removeTodoListAC = (id: string) =>
    ({type: 'REMOVE_TODOLIST', id} as const)
export const addTodoListAC = (todo: TodoListType) =>
    ({type: 'ADD_TODOLIST', todo} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE_TODOLIST_TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE_TODOLIST_FILTER', id, filter} as const)
export const setTodoListsAC = (todoLists: Array<TodoListType>) =>
    ({type: 'SET_TODOLISTS', todoLists} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE_TODOLIST_ENTITY_STATUS', id, status} as const)

//thunks - функция, которая принимает dispatch, getState и предназначена для того, чтобы внутри нее делать побочные эффекты (запросы на сервер) и диспатчить action или другие thunk.
export const getTodoTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.getTodoLists()
        .then((res) => {
            const todos = res.data
            dispatch(setTodoListsAC(todos))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const deleteTodoTC = (todoId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoId, 'loading'))
    todoListAPI.deleteTodo(todoId)
        .then(() => {
            dispatch(removeTodoListAC(todoId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodoTC = (newTodolistTitle: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.createTodo(newTodolistTitle)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.updateTodo(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(id, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}

//types
export type AddTodolistActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
type ActionsTypes = ReturnType<typeof addTodoListAC> |
    ReturnType<typeof removeTodoListAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC> |
    ReturnType<typeof setTodoListsAC> |
    ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<ActionsTypes | SetAppStatusActionType | SetAppErrorActionType>