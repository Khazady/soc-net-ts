import {combineReducers, createStore, Store} from "redux";
import profileReducer, {addPostAC, ProfilePageType, setProfileAC, updateNewPostTextAC} from "./profile-reducer";
import dialogsReducer, {addMessageActionCreator, updateNewMessageTextActionCreator, DialogsPageType} from "./dialogs-reducer";
import userReducer, {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleFollowingProgressAC, toggleIsLoadingAC,
    unfollowAC,
    UsersPageType
} from "./users-reducer";
import authReducer, {AuthType, setAuthUserData} from "./auth-reducer";

export type RootStateType = {
    profilePage: ProfilePageType;
    dialogsPage: DialogsPageType;
    usersPage: UsersPageType;
    auth: AuthType
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
  ReturnType<typeof setProfileAC> |
  ReturnType<typeof setAuthUserData> |
  ReturnType<typeof toggleFollowingProgressAC>

let reducers = combineReducers<RootStateType>({
    //этот объект воспринимать как state
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: userReducer,
    auth: authReducer
});

export let store: Store = createStore(reducers);


//нужно для того, чтобы видеть store в консоли
// @ts-ignore
window.store = store;