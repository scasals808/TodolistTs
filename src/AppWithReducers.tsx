import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {addTodoListAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodoListAC, todoListsReducer} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer, [
        {id: todoListID1, title: "What to learn", filter: 'all'},
        {id: todoListID2, title: "What to learn next", filter: 'active'}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListID1]: [ //[имя переменной] используем в качестве свойства обЬекта-передаем переменную по значению
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "RestApi", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "SASS", isDone: false}
        ]
    });

    function removeTask(taskId: string, todoListID: string) {
        const action = removeTaskAC(taskId, todoListID)
        dispatchToTasksReducer(action)
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListID: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListID)
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todoListID))
    }

    function addTask(newTaskName: string, todoListID: string) {
        const action = addTaskAC(newTaskName, todoListID)
        dispatchToTasksReducer(action)
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatchToTodoListsReducer(changeTodolistTitleAC(todoListID, newTitle))
    }

    function changeTodolistFilter( todoListID: string, newFilterValue: FilterValuesType) {
        dispatchToTodoListsReducer(changeTodolistFilterAC(todoListID, newFilterValue))
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatchToTasksReducer(action)
        dispatchToTodoListsReducer(action)
    }

    function addTodoList(title: string) {
        dispatchToTasksReducer(addTodoListAC(title))
        dispatchToTodoListsReducer(addTodoListAC(title))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodoList}/></Grid>
                <Grid container spacing={5}>{
                    todoLists.map(tl => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: '20px'}} elevation={6}>
                                    <Todolist
                                        todolist={tl}
                                        key={tl.id}
                                        changeTodolistFilter={changeTodolistFilter}
                                        changeTodoListTitle={changeTodoListTitle}
                                        removeTodoList={removeTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })
                }</Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
