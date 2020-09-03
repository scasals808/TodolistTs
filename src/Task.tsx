import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import CancelIcon from "@material-ui/icons/Cancel";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (taskId: string, title: string) => void
    changeStatus: (taskId: string, checked: boolean) => void
    removeTask: (taskId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    let {id, title, isDone} = props.task
    const changeTaskTitle = useCallback((title: string) => {props.changeTaskTitle(id, title)}, [props, id])
    let changeStatus = (event: ChangeEvent<HTMLInputElement>) => props.changeStatus(id, event.currentTarget.checked)
    let removeTask = () => props.removeTask(id)

    return (
        <div key={id} className={isDone ? 'is_done' : ''}>
            <Checkbox
                color={'primary'}
                checked={isDone}
                onChange={changeStatus}
            />
            <EditableSpan title={title} saveNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <CancelIcon/>
            </IconButton>
        </div>
    )
})