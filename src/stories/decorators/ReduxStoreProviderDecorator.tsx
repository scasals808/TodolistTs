import React from "react";
import {Provider} from 'react-redux';
import {AppRootStateType} from "../../app/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/TodoListsList/tasks-reducer";
import {todoListsReducer} from "../../features/TodoListsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../app/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../../features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all",  order: 0, addedDate: '', entityStatus: 'loading'}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState,  applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}
    </Provider>
}
