import {combineReducers} from "redux";
import {todoListsReducer} from "../features/TodoListsList/todolists-reducer";
import {tasksReducer} from "../features/TodoListsList/tasks-reducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type RootReducerType = typeof rootReducer

//export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(thunkMiddleware)
            .concat(logger)
})

export type AppRootStateType = ReturnType<RootReducerType>

// @ts-ignore
window.store = store