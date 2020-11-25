import {ActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {getAuthUserDataTC} from "./auth-reducer";


const INITIALIZING_SUCCESS = "INITIALIZING_SUCCESS"


let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case INITIALIZING_SUCCESS: {
            return {
                ...state,
                initialized: true
            }
        }
        default:
            return state
    }
}

export const setInitializingSuccessAC = () => ({type: INITIALIZING_SUCCESS} as const)


export const initializeAppTC = () => {
    return (dispatch: any) => {
        //dispatch Не только что-то диспатчит, но и умеет возвращать что-то, что напишем в ретурне санки
        let promise = dispatch(getAuthUserDataTC())
        //all ждет пока зарезолвятся все промисы из массива
        Promise.all([promise])
          .then(() => {
              //когда приходит инфа о том, что юзер авторизован(или нет), диспатчим в бизнес initialSuccess
              dispatch(setInitializingSuccessAC())
          })
    }
}

export default appReducer;