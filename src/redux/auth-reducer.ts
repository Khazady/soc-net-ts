import {ActionsType} from "./redux-store";
import {authAPI, loginDataType} from "../api/api";
import {Dispatch} from "redux";

export type AuthType = {
    userId: number | null
    email: string | null
    login: string | null
    isLoading: boolean
    isAuth: boolean
}

const SET_USER_DATA = "SET_USER_DATA"
const TOGGLE_IS_LOADING = "TOGGLE-IS-LOADING"

let initialState: AuthType = {
    userId: null,
    email: null,
    login: null,
    isLoading: false,
    isAuth: false
};
const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                //создаем объект data
                ...action.data,
                //если пришли польз. данные, то авторизован
                isAuth: true
            }
        }
        case "SET-USER-EMAIL-AND-ID":
            return {
                ...state,
                email: action.email,
                userId: action.userId,
                isAuth: true
            }
        case TOGGLE_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return state
    }
}

export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null) =>
  ({type: SET_USER_DATA, data: {userId, email, login}} as const)
export const setUserEmailAndIDAC = (userId: number, email: string) => ({
    type: 'SET-USER-EMAIL-AND-ID', userId, email
} as const)


type ResponseData = {
    resultCode: number,
    data: {
        id: number | null
        login: string | null
        email: string | null
    }
}

export const getAuthUserDataTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
          .then((response: ResponseData) => {
              if (response.resultCode === 0) {
                  let {id, email, login} = response.data;
                  //axios упаковывает в data и разраб сервера упаковал в data
                  dispatch(setAuthUserDataAC(id, email, login))
              }
          });
    }
}
export const loginTC = (loginData: loginDataType) => {
    debugger
    return (dispatch: Dispatch) => {
        authAPI.login(loginData)
          .then((res) => {
              dispatch(setUserEmailAndIDAC(res.userId, loginData.email))
          })
    }
}

export default authReducer;