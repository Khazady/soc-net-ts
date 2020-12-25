import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {userReducer} from './users-reducer';
import {authReducer} from './auth-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from "redux-form"
import {appReducer} from './app-reducer'

export type RootStateType = ReturnType<typeof rootReducer>

let rootReducer = combineReducers({
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
export const store = createStore(rootReducer,composeEnhancers( applyMiddleware(thunkMiddleware)));

//обычный стор
//export let store: Store = createStore(reducers, applyMiddleware(thunkMiddleware));


//нужно для того, чтобы видеть store в консоли
// @ts-ignore
window.store = store