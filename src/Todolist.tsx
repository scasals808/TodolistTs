import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {TaskType, FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
            <button onClick={onClickRemoveTodoList}>X</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
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
                    <li key={task.id} className={task.isDone ? 'is_done' : ''}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeStatus}
                        />
                        <EditableSpan title={task.title} saveNewTitle={changeTaskTitle}/>
                        <button onClick={removeTask}>x
                        </button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button
                className={props.filter === 'all' ? 'active' : ''}
                onClick={onAllClickHandler}>All
            </button>
            <button
                className={props.filter === 'active' ? 'active' : ''}
                onClick={onActiveClickHandler}>Active
            </button>
            <button
                className={props.filter === 'completed' ? 'active' : ''}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
