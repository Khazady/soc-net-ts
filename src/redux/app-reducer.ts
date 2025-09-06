import {getAuthUserDataTC} from "./auth-reducer";
import {BaseThunkType} from "../types/commonTypes";


const initialState = {isInitialized: false};

export const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZING_SUCCESS':
            return {
                ...state,
                isInitialized: true
            }

        default:
            return state
    }
}

// actions
export const toggleIsLoadingAC = (isLoading: boolean) => ({type: 'APP/TOGGLE_IS_LOADING', isLoading} as const)
export const setInitializingSuccessAC = () => ({type: 'APP/INITIALIZING_SUCCESS'} as const)

// thunks
export const initializeAppTC = (): ThunkType => {
    return (dispatch) => {
        // dispatch not only sends actions but can also return what we return from the thunk (does async/await return it itself?)
        let promise = dispatch(getAuthUserDataTC())
        // all waits until all promises in the array are resolved
        Promise.all([promise])
          .then(() => {
              // When we receive info that the user is authorized (or not), dispatch initialSuccess to the store
              dispatch(setInitializingSuccessAC())
          })
    }
}

// types
export type InitialStateType = typeof initialState
export type toggleIsLoadingAC = ReturnType<typeof toggleIsLoadingAC>
type ActionsType = ReturnType<typeof setInitializingSuccessAC>
type ThunkType = BaseThunkType<ActionsType, void>
