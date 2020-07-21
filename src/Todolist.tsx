import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {TaskType, FilterValuesType} from './App';


type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    addTask: (newTaskName: string, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
}

export function Todolist(props: PropsType) {

    let [taskName, setTaskName] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    let addTaskLocal = () => {
        if (taskName.trim()) {
            props.addTask(taskName.trim(), props.id);
            setTaskName('');
        } else {
            setError('Title is required!');
        }
    }

    function onTaskNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setTaskName(event.currentTarget.value);
        setError(null);
    }

    function onAddTaskKeyPressed(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            addTaskLocal()
        }
    }

    function onAllClickHandler() {
        props.changeFilter('all', props.id)
    }

    function onActiveClickHandler() {
        props.changeFilter('active', props.id)
    }

    function onCompletedClickHandler() {
        props.changeFilter('completed', props.id)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                type='text'
                value={taskName}
                onChange={onTaskNameChanged}
                onKeyPress={onAddTaskKeyPressed}
                className={error ? 'error' : ''}
            />
            <button onClick={addTaskLocal}>+</button>
            {error && <div className={'error_message'}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map((task) => {
                let removeTask = () => {
                    props.removeTask(task.id, props.id)
                };
                let changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                    let newCheckBoxValue = event.currentTarget.checked
                    props.changeStatus(task.id, newCheckBoxValue, props.id)
                };
                return (
                    <li key={task.id} className={task.isDone ? 'is_done' : ''}>
                        <input
                            type="checkbox"
                            checked={task.isDone}
                            onChange={changeStatus}
                        />
                        <span>{task.title} </span>
                        <button onClick={removeTask}>x
                        </button >
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
