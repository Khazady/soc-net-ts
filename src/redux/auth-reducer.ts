import {ResultCodeForCaptcha, ResultCodes} from "../api/api"
import {Dispatch} from "redux"
import {FormAction, stopSubmit} from "redux-form"
import {toggleIsLoadingAC} from "./app-reducer"
import {authAPI} from "../api/auth-api"
import {securityAPI} from "../api/security-api"
import {BaseThunkType} from "../types/commonTypes"

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLoading: false,
    isAuth: false,
    captchaUrl: null as string | null, // if null captcha is not required
};
export const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload,
            }
        case 'APP/TOGGLE_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state
    }
}

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
  ({type: 'SET_USER_DATA', payload: {userId, email, login, isAuth}} as const)
export const getCaptchaUrlSuccessAC = (captchaUrl: string) =>
  ({type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)


export const getAuthUserDataTC = (): ThunkType =>
  async (dispatch: Dispatch) => {
      // Return the promise outside; dispatching the thunk will return this promise to app-reducer
      const meData = await authAPI.me()
      if (meData.resultCode === ResultCodes.Success) {
          let {id, email, login} = meData.data;
          // axios wraps in data and the server developer also wrapped it in data
          dispatch(setAuthUserDataAC(id, email, login, true))
      }
  }
export const loginTC = (email: string, password: string, rememberMe: boolean, captchaInput: string): ThunkType =>
  async (dispatch) => {
      const data = await authAPI.login(email, password, rememberMe, captchaInput);
      if (data.resultCode === ResultCodes.Success) {
          // Start the thunk to get user data from the server if login is successful
          dispatch(getAuthUserDataTC())
      } else {
          // captcha
          if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
              dispatch(getCaptchaUrlTC())
          }
          // If resultCode !== 0, stop form submission
          // Check whether the array with error messages is not empty
          let errorMessage = data.messages.length > 0 ? data.messages[0] : 'Unknown error'
          // 1st argument is the <form/> name, second is an object with the problematic field (_error for all fields)
          dispatch(stopSubmit("login", {_error: errorMessage}))
      }
  }
export const getCaptchaUrlTC = (): ThunkType =>
  async (dispatch) => {
      const data = await securityAPI.getCaptchaUrl()
      const captchaUrl = data.url
      dispatch(getCaptchaUrlSuccessAC(captchaUrl))
  }
export const logoutTC = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    if (data.resultCode === 0) {
        // Remove all user info from the state back to the initial state
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}

// types
export type InitialStateType = typeof initialState
type ActionsType =
  | ReturnType<typeof setAuthUserDataAC>
  | ReturnType<typeof getCaptchaUrlSuccessAC>
  | toggleIsLoadingAC
type ThunkType = BaseThunkType<ActionsType
  //extra actions
  | FormAction>