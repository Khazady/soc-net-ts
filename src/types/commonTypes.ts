import {ThunkAction} from "redux-thunk"
import {RootStateType} from "../redux/store"
import {Action} from "redux";

export type BaseThunkType<ActionType extends Action, Returns = Promise<void>> = ThunkAction<Returns, RootStateType, unknown, ActionType>

//profile
export type PostType = {
    id: string
    message: string;
    likesCount: number;
};
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
}

//user
export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

//dialogs
export type DialogItemType = {
    name: string;
    id: number;
    avatar: string
};
export type MessageType = {
    id: string
    message: string;
};