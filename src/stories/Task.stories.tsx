import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: 'Todolist/Task Stories',
    component: Task,

}

const removeTask = action('Remove button inside Task clicked')
const changeStatus = action('Status changed inside Task clicked')
const changeTaskTitle = action('Title changed inside Task clicked')

export const TaskBaseExample = (props: any) => {
    return (<div>
        <Task
            task={{id: '1', status: TaskStatuses.Completed, title: 'CSS', todoListId: '', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
            removeTask={removeTask}
            changeStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
        />
        <Task
            task={{id: '2', status: TaskStatuses.New, title: 'JS', todoListId: '', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}}
            removeTask={removeTask}
            changeStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
        />
    </div>)
};
