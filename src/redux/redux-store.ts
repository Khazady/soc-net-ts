import {combineReducers, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

let reducers = combineReducers({
    //этот объект воспринимать как state
    //такие записи аналогичны
    profileReducer,
    dialogsReducer: dialogsReducer
});

export let store = createStore(reducers);