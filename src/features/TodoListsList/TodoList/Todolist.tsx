import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {
    addTaskTC,
    getTasksTC,
    removeTaskTC,
    updateTaskTC
} from "../tasks-reducer";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolist-api";
import {FilterValuesType, TodoListDomainType} from "../todolists-reducer";


type PropsType = {
    todolist: TodoListDomainType
    changeTodolistFilter: (todoListID: string, newFilterValue: FilterValuesType) => void
    changeTodoListTitle: (taskID: string, newTitle: string) => void
    removeTodoList: (todoListID: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {

    useEffect(() => {
        if(demo){
            return
        }
        dispatch(getTasksTC(props.todolist.id))
    }, [])

    const tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[props.todolist.id])
    const dispatch = useDispatch()

    let allTodoListTasks = tasks
    let tasksForTodolist = allTodoListTasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = allTodoListTasks.filter(task => task.status === TaskStatuses.New)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = allTodoListTasks.filter(task => task.status === TaskStatuses.Completed)
    }

    const onAllClickHandler = useCallback(() =>
        props.changeTodolistFilter(props.todolist.id, 'all'), [props])
    const onActiveClickHandler = useCallback(() =>
        props.changeTodolistFilter(props.todolist.id, 'active'), [props])
    const onCompletedClickHandler = useCallback(() =>
        props.changeTodolistFilter(props.todolist.id, 'completed'), [props])

    function onClickRemoveTodoList() {
        props.removeTodoList(props.todolist.id)
    }

    const removeTask = useCallback((todoId: string, taskId: string) => {
        dispatch(removeTaskTC(todoId, taskId))
    }, [])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props])

    const addTask = useCallback((title: string, todoId: string) => {
        dispatch(addTaskTC(todoId, title))
    }, [])

    const changeStatus = useCallback((taskId: string, status: TaskStatuses, todoId: string) => {
        dispatch(updateTaskTC(todoId, {status}, taskId))
    }, [])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoId: string) => {
        dispatch(updateTaskTC(todoId, {title: newTitle}, taskId))
    }, [])

    return <div>
        <h3><EditableSpan title={props.todolist.title} saveNewTitle={changeTodoListTitle}/>
            <IconButton onClick={onClickRemoveTodoList} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} todoId={props.todolist.id} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map((task, index) => {
                    return (<Task
                        key={index}
                        task={task}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}/>)
                })}
        </div>
        <div>
            <Button variant={props.todolist.filter === 'all' ? 'contained' : 'outlined'}
                    color={props.todolist.filter === 'all' ? 'default' : 'primary'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'contained' : 'outlined'}
                    color={props.todolist.filter === 'active' ? 'default' : 'primary'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'contained' : 'outlined'}
                    color={props.todolist.filter === 'completed' ? 'default' : 'primary'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})
