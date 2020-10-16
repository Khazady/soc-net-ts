import {ActionsType} from "./redux-store";
import {authAPI} from "../api/api";

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

export const setAuthUserDataAC = (userId: number | null, email: string|null, login: string|null) => ({type: SET_USER_DATA, data: {userId, email, login}} as const)

type ResponseData = {
        resultCode: number,
        data: {
            id: number | null
            login: string | null
            email: string | null
        }
}

export const getAuthUserData = () => {
    return (dispatch: any) => {
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

export default authReducer;