import React, {useCallback} from 'react';
import {TaskType, FilterValuesType, TodoListType} from './AppWithRedux';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {Task} from "./Task";


type PropsType = {
    todolist: TodoListType
    changeTodolistFilter: (todoListID: string, newFilterValue: FilterValuesType) => void
    changeTodoListTitle: (taskID: string, newTitle: string) => void
    removeTodoList: (todoListID: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    const tasks = useSelector<AppRootStateType, Array<TaskType>>((state) => state.tasks[props.todolist.id])
    const dispatch = useDispatch()

    let allTodoListTasks = tasks
    let tasksForTodolist = allTodoListTasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = allTodoListTasks.filter(task => task.isDone === false)
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = allTodoListTasks.filter(task => task.isDone === true)
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

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todolist.id))
    }, [dispatch, props])

    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTaskAC(taskId, props.todolist.id))
    }, [dispatch, props.todolist.id])

    const changeStatus = useCallback((taskId: string, newCheckBoxValue: boolean) => {
        dispatch(changeTaskStatusAC(taskId, newCheckBoxValue, props.todolist.id))
    }, [dispatch, props.todolist.id])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, props.todolist.id))
    }, [dispatch, props.todolist.id])

    return <div>
        <h3><EditableSpan title={props.todolist.title} saveNewTitle={changeTodoListTitle}/>
            <IconButton onClick={onClickRemoveTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
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
