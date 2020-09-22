import React, {useEffect, useState} from 'react'
import {todoListAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoLists()
            .then((response) => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'CSS'
        todoListAPI.createTodo(title)
            .then(response => setState(response.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = ''
        todoListAPI.deleteTodo(todoId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        let todoId = '3f60c03c-18c3-42f5-a46a-31942877c4c0'
        let title = 'VUE'
        todoListAPI.updateTodo(todoId, title)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = '3f60c03c-18c3-42f5-a46a-31942877c4c0'
        todoListAPI.getTask(todoId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = '3f60c03c-18c3-42f5-a46a-31942877c4c0'
        let title = 'TASK'
        todoListAPI.createTask(todoId, title)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = ''
        let taskId = ''
        todoListAPI.deleteTask(todoId, taskId)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = '3f60c03c-18c3-42f5-a46a-31942877c4c0'
        let taskId = 'e75e1415-4eb5-4f79-a3b9-9f632fb74221'
        let title = 'BLA BLA'
        todoListAPI.updateTask(todoId, taskId, title)
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
