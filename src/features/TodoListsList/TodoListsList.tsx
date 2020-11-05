import React, {useCallback, useEffect} from "react";
import {
    addTodoTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    deleteTodoTC,
    FilterValuesType,
    getTodoTC,
    TodoListDomainType
} from "./todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./TodoList/Todolist";
import {Redirect} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodoListsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todoLists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        if(demo || !isLoggedIn){
            return
        }
        dispatch(getTodoTC()) //диспатчим вызов санки
    }, [])

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

    if(!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return <>
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
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                )
            })
        }</Grid>
    </>
}