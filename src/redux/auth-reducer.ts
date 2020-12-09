import {ActionsType} from "./redux-store";
import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {stopSubmit} from "redux-form";
import {TOGGLE_IS_LOADING} from "./users-reducer";

// types
export type AuthType = {
    userId: number | null
    email: string | null
    login: string | null
    isLoading: boolean
    isAuth: boolean
    captchaUrl: string | null
}
const SET_USER_DATA = "auth/SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = "auth/GET_CAPTCHA_URL_SUCCESS"
type ResponseData = {
    resultCode: number,
    data: {
        id: number | null
        login: string | null
        email: string | null
    }
}

let initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isLoading: false,
    isAuth: false,
    captchaUrl: null // if null captcha is not required
};
export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        case TOGGLE_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state
    }
}

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
  ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}} as const)
export const getCaptchaUrlSuccessAC = (captchaUrl: string) =>
  ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}} as const)


export const getAuthUserDataTC = () =>
  async (dispatch: Dispatch) => {
      //возвращаем промис внаружу, диспатч TC вернет этот промис в app-reducer
      let response: ResponseData = await authAPI.me()
      if (response.resultCode === 0) {
          let {id, email, login} = response.data;
          //axios упаковывает в data и разраб сервера упаковал в data
          dispatch(setAuthUserDataAC(id, email, login, true))
      }
  }
export const loginTC = (email: string, password: string, rememberMe: boolean, captchaInput: string) =>
  async (dispatch: Dispatch<any>) => {
      let response = await authAPI.login(email, password, rememberMe, captchaInput);
      if (response.resultCode === 0) {
          //запускаем санку получения данных юзера с серва, если успешная логинизация
          dispatch(getAuthUserDataTC())
      } else {
          // captcha
          if (response.resultCode === 10) {
              dispatch(getCaptchaUrlTC())
          }
          //если resultCode !== 0, то останавливаем сабмит формы
          //проверяем не пустой ли массив с сообщ. об ошибке
          let errorMessage = response.messages.length > 0 ? response.messages[0] : "Unknown error"
          //1 арг. название именно <form/>, вторым объект с проблемным полем (_error для всех сразу field)
          dispatch(stopSubmit("login", {_error: errorMessage}))
      }
  }
export const getCaptchaUrlTC = () =>
  async (dispatch: Dispatch<any>) => {
      const response = await securityAPI.getCaptchaUrl();
      const captchaUrl = response.data.url
      dispatch(getCaptchaUrlSuccessAC(captchaUrl))
  }
export const logoutTC = () => async (dispatch: Dispatch) => {
    let response = await authAPI.logout()
    if (response.resultCode === 0) {
        //удаляем всю информацю из стейта о юзере в исходное состояние (initState)
        dispatch(setAuthUserDataAC(null, null, null, false))
    }
}