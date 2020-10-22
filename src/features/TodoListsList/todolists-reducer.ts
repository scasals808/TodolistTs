import {todoListAPI, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";

//variables
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
const SET_TODOLISTS = 'SET_TODOLISTS'

const InitialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = InitialState, action: ActionsTypes): Array<TodoListDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(todo => todo.id !== action.id)
        case ADD_TODOLIST:
            return [{...action.todo, filter: 'all'}, ...state]
        case CHANGE_TODOLIST_TITLE:
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
        case CHANGE_TODOLIST_FILTER:
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        case SET_TODOLISTS:
            return action.todoLists.map(todo => ({...todo, filter: 'all'}))
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

//thunks - функция, которая принимает dispatch, getState и предназначена для того, чтобы внутри нее делать побочные эффекты (запросы на сервер) и диспатчить action или другие thunk.
export const getTodoTC = () => (dispatch: Dispatch<ActionsTypes>) => {
    todoListAPI.getTodoLists()
        .then((res) => {
            const todos = res.data
            dispatch(setTodoListsAC(todos))
        })
}
export const deleteTodoTC = (todoId: string) => (dispatch: Dispatch<ActionsTypes>) => {
    todoListAPI.deleteTodo(todoId)
        .then(() => {
            dispatch(removeTodoListAC(todoId))
        })
}
export const addTodoTC = (newTodolistTitle: string) => (dispatch: Dispatch<ActionsTypes>) => {
    todoListAPI.createTodo(newTodolistTitle)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionsTypes>) => {
    todoListAPI.updateTodo(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(id, title))
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
    ReturnType<typeof setTodoListsAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}