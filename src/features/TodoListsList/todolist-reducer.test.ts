import {
    addTodoListAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodoListAC, TodoListDomainType,
    todoListsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../app/app-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListDomainType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: 'idle',addedDate: '', order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",entityStatus: 'idle', addedDate: '', order: 0}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0};

    const endState = todoListsReducer(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle.title);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    // const action = {
    //     type: 'CHANGE_TODOLIST_TITLE' as const,
    //     id: todolistId2,
    //     title: newTodolistTitle
    // };
    const endState = todoListsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todoListsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";

    const endState = todoListsReducer(startState, changeTodolistEntityStatusAC(todolistId2, newStatus));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});




