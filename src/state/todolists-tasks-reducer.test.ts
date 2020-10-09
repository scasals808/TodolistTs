import {TaskStateType} from "../AppWithRedux";
import {addTodoListAC, removeTodoListAC, TodoListDomainType, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses, TodoListType} from "../api/todolist-api";


let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {description: '', title: 'rfr', status: 0,
                priority: 0, startDate: '', deadline: '',
                id: 'fgh', todoListId: '', order: 0, addedDate: ''},
            {description: '', title: 'rfr', status: 1,
                priority: 0, startDate: '', deadline: '',
                id: 'fgh', todoListId: '', order: 0, addedDate: ''},
            {description: '', title: 'rfr', status: 0,
                priority: 0, startDate: '', deadline: '',
                id: 'fgh', todoListId: '', order: 0, addedDate: ''},
        ],
        "todolistId2": [
            {description: '', title: 'rfr', status: 0,
                priority: 0, startDate: '', deadline: '',
                id: 'fgzxczxh', todoListId: '', order: 0, addedDate: ''},
            {description: '', title: 'rfr', status: 1,
                priority: 0, startDate: '', deadline: '',
                id: 'ww', todoListId: '', order: 0, addedDate: ''},
            {description: '', title: 'rfr', status: 0,
                priority: 0, startDate: '', deadline: '',
                id: 'fgdfgh', todoListId: '', order: 0, addedDate: ''},
        ]
    }
})

test('new array should be added when new todolist is added', () => {

    const action = addTodoListAC({
        id: 'blabla',
        title: 'newTodo',
        addedDate: '',
        order: 0
    });

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: Array<TodoListDomainType> = [];

    const action = addTodoListAC({
        id: 'ADD_TODOLIST',
        title: 'newTodo',
        addedDate: '',
        order: 0
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todo.id);
    expect(idFromTodoLists).toBe(action.todo.id);
});
