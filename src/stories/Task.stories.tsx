import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";

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
            task={{id: '1', isDone: true, title: 'CSS'}}
            removeTask={removeTask}
            changeStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
        />
        <Task
            task={{id: '2', isDone: false, title: 'JS'}}
            removeTask={removeTask}
            changeStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
        />
    </div>)
};
