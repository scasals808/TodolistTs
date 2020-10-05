import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodoListAC,
    // setTodoListsAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType, TodoListType} from "./api/todolist-api";

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    // useEffect(() => {
    //     todoListAPI.getTodoLists()
    //         .then((res) => {
    //             let todos = res.data
    //             // dispatch(setTodoListsAC(res.data))
    //         })
    // }, [])

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todoListID, newTitle))
    }, [dispatch])

    const changeTodolistFilter = useCallback(( todoListID: string, newFilterValue: FilterValuesType) =>  {
        dispatch(changeTodolistFilterAC(todoListID, newFilterValue))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const addTodoList = useCallback((title: string) =>  {
        dispatch(addTodoListAC(title))
    },[dispatch])

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
                    todoLists.map((tl,index) => {
                        return (
                            <Grid item key={index}>
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
