import {addTaskAC, removeTaskAC, tasksReducer, TaskStateType, updateTaskAC} from './tasks-reducer';
import {addTodoListAC, setTodoListsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";


let startState: TaskStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC({taskId: "2", todoId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {

    let task = {
        description: '', title: 'juce', status: 0,
        priority: 0, startDate: '', deadline: '',
        id: 'fgzxczxh', todoListId: 'todolistId2', order: 0, addedDate: ''
    };
    const action = addTaskAC(task);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].todoListId).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('new arr should be added when new todo in added', () => {

    const action = addTodoListAC({
        todo: {
            id: 'lblblb',
            title: 'new todo',
            addedDate: '',
            order: 0
        }
    })

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(key => key != 'todolistId1' && key != 'todolistId2')
    if (!newKey) {
        throw new Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC({
            taskId: "2",
            model: {
                status: TaskStatuses.New
            },
            todoId: "todolistId2"
        })
    ;

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC({
        taskId: "2",
        model: {
            title: 'beer'
        },
        todoId: "todolistId2"
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
});
test('empty arr should be added when we set todo', () => {

    const action = setTodoListsAC({
        todoLists: [
            {id: "todolistId1", title: "What to learn", addedDate: '', order: 0},
            {id: "todolistId2", title: "What to buy", addedDate: '', order: 0}
        ]
    })
    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState["todolistId1"]).toBeDefined()
    expect(endState["todolistId2"]).toBeDefined()
})

