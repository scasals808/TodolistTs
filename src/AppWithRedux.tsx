import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoTC,
    changeTodolistFilterAC,changeTodolistTitleTC, deleteTodoTC, FilterValuesType, getTodoTC,
    TodoListDomainType,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./api/todolist-api";

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    useEffect(() => {
        dispatch(getTodoTC()) //диспатчим вызов санки
    }, [])

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)

    const changeTodoListTitle = useCallback((todoListID: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC(todoListID, newTitle))
    }, [])

    const changeTodolistFilter = useCallback((todoListID: string, newFilterValue: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListID, newFilterValue))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodoTC(todoListID))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoTC(title))
    }, [])

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
                <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodoList} todoId={''}/></Grid>
                <Grid container spacing={5}>{
                    todoLists.map((tl, index) => {
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
