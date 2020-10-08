import {todoListAPI, TodoListType} from "../api/todolist-api";
import {Dispatch} from "redux";

const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
const SET_TODOLISTS = 'SET_TODOLISTS'

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    todo: TodoListType
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodoListsActionType = {
    type: 'SET_TODOLISTS'
    todoLists: Array<TodoListType>
}

type ActionsTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoListsActionType


const InitialState: Array<TodoListDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state: Array<TodoListDomainType> = InitialState, action: ActionsTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.id)
        //не используем спред ...state т.к. метод .фильтр создает новый массив(не мутирует старый)
        case ADD_TODOLIST: {
            // return [{
            //     id: action.todo.id,
            //     filter: 'all',
            //     title: action.todo.title,
            //     addedDate: '',
            //     order: 0
            // }, ...state]
            const newTodo: TodoListDomainType = {...action.todo, filter: 'all'}
            return [newTodo, ...state]
        }
        case CHANGE_TODOLIST_TITLE:
            // const newTodoListTitle = state.find(todo => todo.id === action.id)
            // if (newTodoListTitle) {
            //     newTodoListTitle.title = action.title
            // }
            // return ([...state])
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
        case CHANGE_TODOLIST_FILTER:
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        case SET_TODOLISTS:
            return action.todoLists.map(todo => ({ // добавляем фиьтер кв каждый тудулист
                ...todo,
                    filter: 'all'
            }))
        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE_TODOLIST', id: todoListId}
}

export const addTodoListAC = (todo: TodoListType): AddTodolistActionType => {
    return {type: 'ADD_TODOLIST', todo}
}

export const changeTodolistTitleAC = (todoListId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', id: todoListId, title: newTodolistTitle}
}

export const changeTodolistFilterAC = (todoListId: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', id: todoListId, filter: newFilter}
}

export const setTodoListsAC = (todoLists: Array<TodoListType>): SetTodoListsActionType => {
    return {type: 'SET_TODOLISTS', todoLists}
}
//Thunk - функция, которая принимает dispatch, getState и предназначена для того, чтобы внутри нее делать побочные эффекты (запросы на сервер) и диспатчить action или другие thunk.
export const getTodoTC = () => (dispatch: Dispatch) => {
    todoListAPI.getTodoLists()
        .then((res) => {
            const todos = res.data
            dispatch(setTodoListsAC(todos))
        })
}

export const deleteTodoTC = (todoId: string) => (dispatch: Dispatch) => {
    todoListAPI.deleteTodo(todoId)
        .then(() => {
            dispatch(removeTodoListAC(todoId))
        })
}

export const addTodoTC = (newTodolistTitle: string) => (dispatch: Dispatch) => {
    todoListAPI.createTodo(newTodolistTitle)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.updateTodo(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}
