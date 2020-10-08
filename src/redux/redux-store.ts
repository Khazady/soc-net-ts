import {combineReducers, createStore, Store} from "redux";
import profileReducer, {addPostAC, ProfilePageType, setProfileAC, updateNewPostTextAC} from "./profile-reducer";
import dialogsReducer, {addMessageActionCreator, updateNewMessageTextActionCreator, DialogsPageType} from "./dialogs-reducer";
import userReducer, {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleIsLoadingAC,
    unfollowAC,
    UsersPageType
} from "./users-reducer";

export type RootStateType = {
    profilePage: ProfilePageType;
    dialogsPage: DialogsPageType;
    usersPage: UsersPageType
};
export type ActionsType =
//автоматическая типизация ActionCreator, добавить as const и убрать типизацию того, что выходит из функции(после кавычек)
  ReturnType<typeof addPostAC> |
  ReturnType<typeof updateNewPostTextAC> |
  ReturnType<typeof addMessageActionCreator> |
  ReturnType<typeof updateNewMessageTextActionCreator> |
  ReturnType<typeof followAC> |
  ReturnType<typeof unfollowAC> |
  ReturnType<typeof setUsersAC> |
  ReturnType<typeof setCurrentPageAC> |
  ReturnType<typeof setTotalUsersCountAC> |
  ReturnType<typeof toggleIsLoadingAC> |
  ReturnType<typeof setProfileAC>;

let reducers = combineReducers<RootStateType>({
    //этот объект воспринимать как state
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: userReducer
});

export let store: Store = createStore(reducers);


//нужно для того, чтобы видеть store в консоли
// @ts-ignore
window.store = store;