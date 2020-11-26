import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// const SET_ERROR = 'APP/SET_ERROR'
// const SET_STATUS = 'APP/SET_STATUS'
// const SET_INITIALIZED = 'APP/SET_INITIALIZED'

export const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions

// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case SET_ERROR:
//             return {...state, error: action.error}
//         case SET_STATUS:
//             return {...state, status: action.status}
//         case SET_INITIALIZED:
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return state
//     }
// }

// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)
// export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET_INITIALIZED', isInitialized} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
        } else {
        }
        dispatch(setAppInitializedAC({isInitialized: true}))
    })
}

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>;
// type ActionsType =
//     SetAppErrorActionType
//     | SetAppStatusActionType
//     | SetAppInitializedActionType
