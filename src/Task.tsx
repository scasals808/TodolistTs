import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import CancelIcon from "@material-ui/icons/Cancel";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (taskId: string, title: string) => void
    changeStatus: (taskId: string, checked: TaskStatuses) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    let {id, title, status} = props.task
    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(id, title)
    }, [props, id])
    //в параметры коллбека нужно передать булево значение, хотя в типах у нас числа... используем тернарник который сразу резолвится, круто
    let changeStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeStatus(id, event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
    let removeTask = () => props.removeTask(id)

    return (
        <div key={id} className={props.task.status === TaskStatuses.Completed ? 'is_done' : ''}>
            <Checkbox
                color={'primary'}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatus}
            />
            <EditableSpan title={title} saveNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <CancelIcon/>
            </IconButton>
        </div>
    )
})