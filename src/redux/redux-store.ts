import {combineReducers, createStore, Store} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import {DialogsPageType, ProfilePageType} from "./store";

export type RootStateType = {
    profilePage: ProfilePageType;
    dialogsPage: DialogsPageType;
};

let reducers = combineReducers<RootStateType>({
    //этот объект воспринимать как state
    profilePage: profileReducer,
    dialogsPage: dialogsReducer
});

export let store: Store = createStore(reducers);