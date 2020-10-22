import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '0bbbf023-77a9-44fe-841d-51e508b8f676'
    }
})

//api
export const todoListAPI = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>(`todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoListType }>>(`todo-lists`, {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string = '') {
        return instance.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
    },
    getTask(todoId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string = 'new task') {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask(todoId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<CommonResponseType>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}

//types
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}
