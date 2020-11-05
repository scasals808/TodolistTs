import {Dispatch} from "react";
import {setIsLoggedInAC, SetIsLoggedInActionType} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolist-api";

const SET_ERROR = 'APP/SET_ERROR'
const SET_STATUS = 'APP/SET_STATUS'
const SET_INITIALIZED = 'APP/SET_INITIALIZED'

export const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error}
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const)
export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET_INITIALIZED', isInitialized} as const)

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {
            }
            dispatch(setAppInitializedAC(true))
        })
}

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitializedActionType = ReturnType<typeof setAppInitializedAC>;

type ActionsType =
    SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsLoggedInActionType
    | SetAppInitializedActionType
