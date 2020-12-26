import {v1} from "uuid"
import {FormAction, stopSubmit} from "redux-form"
import {PhotosType, PostType, ProfileType, BaseThunkType} from "../types/commonTypes"
import {profileAPI} from "../api/profile-api";

const initialState = {
    postsData: [
        {id: v1(), message: "Hi, how are you?", likesCount: 7},
        {id: v1(), message: "It's my first post", likesCount: 53},
        {id: v1(), message: "КУ", likesCount: 3},
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ""
}

export const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD_POST':
            let newPost = {id: v1(), message: action.newPostText, likesCount: 0};
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }
        case 'PROFILE/DELETE_POST':
            return {
                ...state,
                postsData: state.postsData.filter(post => post.id !== action.postId)
            }
        case 'PROFILE/SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                //меняем только объект с фотками
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        default:
            return state
    }
}


// actions
export const addPostAC = (newPostText: string) => ({type: 'PROFILE/ADD_POST', newPostText} as const)
export const deletePostAC = (postId: string) => ({type: 'PROFILE/DELETE_POST', postId} as const)
export const setProfileAC = (profile: ProfileType) => ({type: 'PROFILE/SET_PROFILE', profile} as const)
export const setStatusAC = (status: string) => ({type: 'PROFILE/SET_STATUS', status} as const)
export const savePhotosSuccessAC = (photos: PhotosType) => ({type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)


// thunks
export const getUserProfileTC = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(setProfileAC(data))
}
export const getStatusTC = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUserStatus(userId)
    dispatch(setStatusAC(data))
}
export const updateStatusTC = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatusAC(status))
        }
    } catch (error) {
        alert(error)
    }
}
export const updatePhotoTC = (photo: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.uploadPhoto(photo)
    if (data.resultCode === 0) {
        dispatch(savePhotosSuccessAC(data.data.photos))
    }
}
export const updateProfileTC = (changedProfile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.updateProfile(changedProfile)
    if (data.resultCode === 0) {
        //because in initState userId = null
        if (userId)
          //т.к серв не возвращает обновленный профиль, то диспатчим санку для его получения
            await dispatch(getUserProfileTC(userId))
        else
            throw new Error('userId can\'t be a null')
    } else {
        //в чейне выбираем из строки ошибки с сервера название нужного поля, в котором она происходит
        dispatch(stopSubmit('edit-profile', {'contacts': {[data.messages[0].substring(30, data.messages[0].length - 1).toLowerCase()]: data.messages[0]}}))
        return Promise.reject(data.messages[0]);
    }
}
// types
export type InitialStateType = typeof initialState
type ActionsType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof deletePostAC>
  | ReturnType<typeof setProfileAC>
  | ReturnType<typeof setStatusAC>
  | ReturnType<typeof savePhotosSuccessAC>
type ThunkType = BaseThunkType<ActionsType | FormAction>

