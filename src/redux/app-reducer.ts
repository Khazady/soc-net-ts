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
        //dispatch Не только что-то диспатчит, но и умеет возвращать что-то, что напишем в ретурне санки(или async await сам по себе ретурнит его??)
        let promise = dispatch(getAuthUserDataTC())
        //all ждет пока зарезолвятся все промисы из массива
        Promise.all([promise])
          .then(() => {
              //когда приходит инфа о том, что юзер авторизован(или нет), диспатчим в бизнес initialSuccess
              dispatch(setInitializingSuccessAC())
          })
    }
}

// types
export type InitialStateType = typeof initialState
export type toggleIsLoadingAC = ReturnType<typeof toggleIsLoadingAC>
type ActionsType = ReturnType<typeof setInitializingSuccessAC>
type ThunkType = BaseThunkType<ActionsType, void>
