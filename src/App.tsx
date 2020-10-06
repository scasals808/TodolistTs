import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api'
import {TodoListDomainType} from "./state/todolists-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed';


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListDomainType>>([
        {id: todoListID1, title: "What to learn", filter: 'all', addedDate: '', order: 0},
        {id: todoListID2, title: "What to learn next", filter: 'active', addedDate: '', order: 0}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoListID1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todoListID1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        [todoListID2]: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: todoListID2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: todoListID2, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    })

    function removeTask(taskId: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(task => task.id !== taskId)
        setTasks({...tasks})
    }

    function changeTaskStatus(id: string, status: TaskStatuses, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.status = status;
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks})
        }
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        let todoList = todoLists.find(t => t.id === id)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
            //сетаем в стейт копию массива чтобы реакт отреагировал перерисовкой, если засетать не копию перерисовки не будет
        }
    }

    function addTask(newTaskName: string, todoListID: string) {
        let newTask = {
            id: v1(), title: newTaskName, status: TaskStatuses.New, todoListId: todoListID, description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        }
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})//перерисовка
    }

    function changeTodolistFilter(todoListID: string, newFilterValue: FilterValuesType) {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        let newTodoListID = v1()
        let newTodoList: TodoListDomainType = {
            id: newTodoListID,
            title: title,
            filter: "all",
            addedDate: '',
            order: 0
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks, [newTodoListID]: [],
        })
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
                            tasksForTodolist = tasks[tl.id].filter(task => task.status === TaskStatuses.New)
                        }
                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasks[tl.id].filter(task => task.status === TaskStatuses.Completed)
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

export default App;
