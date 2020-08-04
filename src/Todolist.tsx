import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {TaskType, FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import CancelIcon from '@material-ui/icons/Cancel';


type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void
    changeTodolistFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTask: (newTaskName: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (taskID: string, newTitle: string) => void
    removeTodoList: (todoListID: string) => void
}

export function Todolist(props: PropsType) {
    function onAllClickHandler() {
        props.changeTodolistFilter('all', props.id)
    }

    function onActiveClickHandler() {
        props.changeTodolistFilter('active', props.id)
    }

    function onCompletedClickHandler() {
        props.changeTodolistFilter('completed', props.id)
    }

    function onClickRemoveTodoList() {
        props.removeTodoList(props.id)
    }

    function addTask(title: string) {
        props.addTask(title, props.id)
    }

    function changeTodoListTitle(newTitle: string) {
        props.changeTodoListTitle(props.id, newTitle)
    }

    return <div>
        <h3><EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
            <IconButton onClick={onClickRemoveTodoList}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {props.tasks.map((task) => {
                let removeTask = () => {
                    props.removeTask(task.id, props.id)
                };
                let changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                    let newCheckBoxValue = event.currentTarget.checked
                    props.changeTaskStatus(task.id, newCheckBoxValue, props.id)
                };
                let changeTaskTitle = (newTitle: string) => {
                    props.changeTaskTitle(task.id, newTitle, props.id)
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
                            <CancelIcon />
                        </IconButton>
                    </div>
                )
            })}
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    color={props.filter === 'all' ? 'default' : 'primary'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color={props.filter === 'active' ? 'default' : 'primary'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    color={props.filter === 'completed' ? 'default' : 'primary'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
