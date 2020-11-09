import {v1} from "uuid";
import {ActionsType} from "./redux-store";
import {profileAPI} from "../api/api";
import {Dispatch} from "redux";

let initialState: ProfilePageType = {
    postsData: [
        {id: v1(), message: "Hi, how are you?", likesCount: 7},
        {id: v1(), message: "It's my first post", likesCount: 53},
        {id: v1(), message: "КУ", likesCount: 3},
    ],
    profile: null,
    status: ""
};

// reducer
const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {id: v1(), message: action.newPostText, likesCount: 0};
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            };
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}


// actions
export const addPostAC = (newPostText: string) => ({type: 'ADD_POST', newPostText} as const)
export const setProfileAC = (profile: ProfilePageType) => ({type: 'SET_PROFILE', profile} as const)
export const setStatusAC = (status: string) => ({type: 'SET_STATUS', status} as const)


// thunks
export const getUserProfileTC = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
      .then(data => {
          dispatch(setProfileAC(data))
      });
}
export const getUserStatusTC = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getUserStatus(userId)
      .then(data => {
          dispatch(setStatusAC(data))
      });
}

export const updateStatusTC = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatus(status)
      .then(data => {
          if(data.resultCode === 0) {
              dispatch(setStatusAC(status))
          }
      });
}

// types
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

export default profileReducer;