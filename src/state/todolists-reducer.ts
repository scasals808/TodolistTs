import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST'
    title: string
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

type ActionsTypes = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType

export const todoListsReducer = (state: Array<TodoListType>, action: ActionsTypes) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(todo => todo.id !== action.id)
        //не используем спред ...state т.к. метод .фильтр создает новый массив(не мутирует старый)
        case 'ADD_TODOLIST':
            const newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]
        case 'CHANGE_TODOLIST_TITLE':
            // const newTodoListTitle = state.find(todo => todo.id === action.id)
            // if (newTodoListTitle) {
            //     newTodoListTitle.title = action.title
            // }
            // return ([...state])
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
        case 'CHANGE_TODOLIST_FILTER':
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        default:
            throw new Error('I dont understand this type')
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE_TODOLIST', id: todoListId}
}

export const AddTodoListAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {type: 'ADD_TODOLIST', title: newTodolistTitle}
}

export const ChangeTodolistTitleAC = (todoListId: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE_TODOLIST_TITLE', id: todoListId, title: newTodolistTitle}
}

export const ChangeTodolistFilterAC = (todoListId: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE_TODOLIST_FILTER', id: todoListId, filter: newFilter}
}