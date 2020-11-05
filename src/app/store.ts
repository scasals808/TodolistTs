import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListsReducer} from "../features/TodoListsList/todolists-reducer";
import {tasksReducer} from "../features/TodoListsList/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store