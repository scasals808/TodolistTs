import {todoListAPI, TodoListType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC,} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//variables
// const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
// const ADD_TODOLIST = 'ADD_TODOLIST'
// const CHANGE_TODOLIST_TITLE = 'CHANGE_TODOLIST_TITLE'
// const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST_FILTER'
// const SET_TODOLISTS = 'SET_TODOLISTS'
// const CHANGE_TODOLIST_ENTITY_STATUS = 'CHANGE_TODOLIST_ENTITY_STATUS'

const initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodoListAC(state, action: PayloadAction<{ todo: TodoListType }>) {
            state.unshift({...action.payload.todo, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodoListsAC(state, action: PayloadAction<{ todoLists: Array<TodoListType> }>) {
            return action.payload.todoLists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }
    }
})

export const todoListsReducer = slice.reducer
export const {
    removeTodoListAC, addTodoListAC, changeTodolistTitleAC,
    changeTodolistFilterAC, setTodoListsAC, changeTodolistEntityStatusAC
} = slice.actions

// export const todoListsReducer = (state: Array<TodoListDomainType> = InitialState, action: ActionsTypes): Array<TodoListDomainType> => {
//     switch (action.type) {
//         case REMOVE_TODOLIST:
//             return state.filter(todo => todo.id !== action.id)
//         case ADD_TODOLIST:
//             return [{...action.todo, filter: 'all', entityStatus: 'idle'}, ...state]
//         case CHANGE_TODOLIST_TITLE:
//             return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
//         case CHANGE_TODOLIST_FILTER:
//             return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
//         case CHANGE_TODOLIST_ENTITY_STATUS:
//             return state.map(todo => todo.id === action.id ? {...todo, entityStatus: action.status} : todo)
//         case SET_TODOLISTS:
//             return action.todoLists.map(todo => ({...todo, filter: 'all', entityStatus: 'idle'}))
//         default:
//             return state
//     }
// }

//actions
// export const removeTodoListAC = (id: string) =>
//     ({type: 'REMOVE_TODOLIST', id} as const)
// export const addTodoListAC = (todo: TodoListType) =>
//     ({type: 'ADD_TODOLIST', todo} as const)
// export const changeTodolistTitleAC = (id: string, title: string) =>
//     ({type: 'CHANGE_TODOLIST_TITLE', id, title} as const)
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
//     ({type: 'CHANGE_TODOLIST_FILTER', id, filter} as const)
// export const setTodoListsAC = (todoLists: Array<TodoListType>) =>
//     ({type: 'SET_TODOLISTS', todoLists} as const)
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
//     ({type: 'CHANGE_TODOLIST_ENTITY_STATUS', id, status} as const)

//thunks - функция, которая принимает dispatch, getState и предназначена для того, чтобы внутри нее делать побочные эффекты (запросы на сервер) и диспатчить action или другие thunk.
export const getTodoTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListAPI.getTodoLists()
        .then((res) => {
            const todos = res.data
            dispatch(setTodoListsAC({todoLists: todos}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const deleteTodoTC = (todoId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: todoId, status: 'loading'}))
    todoListAPI.deleteTodo(todoId)
        .then(() => {
            dispatch(removeTodoListAC({id: todoId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTodoTC = (newTodolistTitle: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListAPI.createTodo(newTodolistTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC({todo: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListAPI.updateTodo(id, title)
        .then(() => {
            dispatch(changeTodolistTitleAC({id: id, title: title}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}

//types
export type AddTodolistActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
// type ActionsTypes = ReturnType<typeof addTodoListAC> |
//     ReturnType<typeof removeTodoListAC> |
//     ReturnType<typeof changeTodolistTitleAC> |
//     ReturnType<typeof changeTodolistFilterAC> |
//     ReturnType<typeof setTodoListsAC> |
//     ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}
// type ThunkDispatch = Dispatch<SetAppStatusActionType | SetAppErrorActionType>