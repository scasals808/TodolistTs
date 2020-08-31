import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {addTodoListAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodoListAC, todoListsReducer} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

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

function AppWithRedux() {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        dispatch(changeTodolistTitleAC(todoListID, newTitle))
    }

    function changeTodolistFilter( todoListID: string, newFilterValue: FilterValuesType) {
        dispatch(changeTodolistFilterAC(todoListID, newFilterValue))
    }

    function removeTodoList(todoListID: string) {
        const action = removeTodoListAC(todoListID)
        dispatch(action)

    }

    function addTodoList(title: string) {
        dispatch(addTodoListAC(title))
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

export default AppWithRedux;
