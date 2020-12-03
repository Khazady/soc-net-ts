import {v1} from "uuid";
import {ActionsType} from "./redux-store";
import {profileAPI} from "../api/api";
import {Dispatch} from "redux";

// types
const ADD_POST = 'profile/ADD_POST'
const DELETE_POST = 'profile/DELETE_POST'
const SET_PROFILE = 'profile/SET_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
export type PostTypes = {
    id: string
    message: string;
    likesCount: number;
};
export type ProfilePageType = {
    postsData: Array<PostTypes>;
    profile: any
    status: string
};

let initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: "Hi, how are you?", likesCount: 7},
        {id: v1(), message: "It's my first post", likesCount: 53},
        {id: v1(), message: "КУ", likesCount: 3},
    ],
    profile: null,
    status: ""
};

export const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {id: v1(), message: action.newPostText, likesCount: 0};
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(post => post.id !== action.postId)
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}


// actions
export const addPostAC = (newPostText: string) => ({type: ADD_POST, newPostText} as const)
export const deletePostAC = (postId: string) => ({type: DELETE_POST, postId} as const)
export const setProfileAC = (profile: ProfilePageType) => ({type: SET_PROFILE, profile} as const)
export const setStatusAC = (status: string) => ({type: SET_STATUS, status} as const)


// thunks
export const getUserProfileTC = (userId: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setProfileAC(response))
}
export const getUserStatusTC = (userId: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.getUserStatus(userId)
    dispatch(setStatusAC(response))
}
export const updateStatusTC = (status: string) => async (dispatch: Dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(setStatusAC(status))
    }
}

