import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {
    addPostAC,
    deletePostAC,
    profileReducer,
    savePhotosSuccessAC,
    setProfileAC,
    setStatusAC
} from "./profile-reducer";
import {addMessageAC, deleteMessageAC, dialogsReducer} from "./dialogs-reducer";
import userReducer, {
    followSuccessAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC,
    toggleFollowingProgressAC,
    toggleIsLoadingAC,
    unfollowSuccessAC,
} from "./users-reducer";
import {authReducer, getCaptchaUrlSuccessAC, setAuthUserDataAC} from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import appReducer, {setInitializingSuccessAC} from "./app-reducer";

export type RootStateType = ReturnType<typeof reducers>
export type ActionsType =
//автоматическая типизация ActionCreator, добавить as const и убрать типизацию того, что выходит из функции(после кавычек)
  ReturnType<typeof addPostAC> |
  ReturnType<typeof addMessageAC> |
  ReturnType<typeof followSuccessAC> |
  ReturnType<typeof unfollowSuccessAC> |
  ReturnType<typeof setUsersAC> |
  ReturnType<typeof setCurrentPageAC> |
  ReturnType<typeof setTotalUsersCountAC> |
  ReturnType<typeof toggleIsLoadingAC> |
  ReturnType<typeof setProfileAC> |
  ReturnType<typeof setAuthUserDataAC> |
  ReturnType<typeof toggleFollowingProgressAC> |
  ReturnType<typeof setStatusAC> |
  ReturnType<typeof setInitializingSuccessAC> |
  ReturnType<typeof deletePostAC> |
  ReturnType<typeof deleteMessageAC> |
  ReturnType<typeof savePhotosSuccessAC> |
  ReturnType<typeof getCaptchaUrlSuccessAC>

let reducers = combineReducers({
    //этот объект воспринимать как state
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: userReducer,
    auth: authReducer,
    app: appReducer,
    //redux-form
    form: formReducer
});

//store for ReduxDevTools
//расширение добавит в глобальный window __REDUX_D.., если его нет то обычный compose
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers,composeEnhancers( applyMiddleware(thunkMiddleware)));

//обычный стор
//export let store: Store = createStore(reducers, applyMiddleware(thunkMiddleware));


//нужно для того, чтобы видеть store в консоли
// @ts-ignore
window.store = store;