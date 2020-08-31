import React, {ChangeEvent} from 'react';
import {TaskType, FilterValuesType, TodoListType} from './AppWithRedux';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import CancelIcon from '@material-ui/icons/Cancel';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";


type PropsType = {
    todolist: TodoListType
    changeTodolistFilter: (todoListID: string, newFilterValue: FilterValuesType) => void
    changeTodoListTitle: (taskID: string, newTitle: string) => void
    removeTodoList: (todoListID: string) => void
}

export function Todolist(props: PropsType) {

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

    function onAllClickHandler() {
        props.changeTodolistFilter(props.todolist.id, 'all')
    }

    function onActiveClickHandler() {
        props.changeTodolistFilter(props.todolist.id, 'active')
    }

    function onCompletedClickHandler() {
        props.changeTodolistFilter(props.todolist.id, 'completed')
    }

    function onClickRemoveTodoList() {
        props.removeTodoList(props.todolist.id)
    }

    function changeTodoListTitle(newTitle: string) {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }

    function addTask(title: string) {
        dispatch(addTaskAC(title, props.todolist.id))
    }

    return <div>
        <h3><EditableSpan title={props.todolist.title} saveNewTitle={changeTodoListTitle}/>
            <IconButton onClick={onClickRemoveTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(task => {
                let removeTask = () => {
                    dispatch(removeTaskAC(task.id, props.todolist.id))
                };
                let changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                    let newCheckBoxValue = event.currentTarget.checked
                    dispatch(changeTaskStatusAC(task.id, newCheckBoxValue, props.todolist.id))
                };
                let changeTaskTitle = (newTitle: string) => {
                    dispatch(changeTaskTitleAC(task.id, newTitle, props.todolist.id))
                }

                return (
                    <div key={task.id} className={task.isDone ? 'is_done' : ''}>
                        <Checkbox
                            color={'primary'}
                            checked={task.isDone}
                            onChange={changeStatus}
                        />
                        <EditableSpan title={task.title} saveNewTitle={changeTaskTitle}/>
                        <IconButton onClick={removeTask}>
                            <CancelIcon/>
                        </IconButton>
                    </div>
                )
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
}
