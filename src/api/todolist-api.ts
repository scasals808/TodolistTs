import axios from "axios";

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskType = {
    items: {
        description: string | null
        title: string
        completed: boolean
        status: number
        priority: number
        startDate: string | null
        deadline: string | null
        id: string
        todoListId: string
        order: number
        addedDate: string
    }
    "totalCount": number
    "error": null | string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        'API-KEY': '0bbbf023-77a9-44fe-841d-51e508b8f676'
    }
})

export const todoListAPI = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>(`todo-lists`)
    },
    createTodo(title: string = 'angular') {
        return instance.post<CommonResponseType<{ item: TodoListType }>>(`todo-lists`, {title})
    },
    deleteTodo(todoId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoId}`)
    },
    updateTodo(todoId: string, title: string = '') {
        return instance.put<CommonResponseType>(`todo-lists/${todoId}`, {title})
    },
    getTask(todoId: string) {
        return instance.get<TaskType>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string = 'new task') {
        return instance.post<CommonResponseType>(`todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask(todoId: string, taskId: string, title: string = ''){
        return instance.put<CommonResponseType>(`todo-lists/${todoId}/tasks/${taskId}`, {title})
    }
}