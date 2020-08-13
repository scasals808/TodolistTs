type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT_AGE':
            let newState = {...state}
            newState.age = newState.age + 1
            return newState
        case 'INCREMENT_CHILDREN_COUNT':
            return {
                ...state,
                childrenCount: state.childrenCount + 1
            }
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.newName
            }
        default:
            throw new Error('I dont understand this type')
    }
}
