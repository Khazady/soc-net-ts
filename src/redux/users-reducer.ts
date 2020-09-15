import {v1} from "uuid";
import {ActionsType} from "./redux-store";

type LocationType = {
    country: string
    city: string
}
export type UsersType = {
    id: string
    photos: any
    isFollowed: boolean
    name: string
    status: string
    location: LocationType
}
export type UsersPageType = {
    usersData: Array<UsersType>
}


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";

let initialState: UsersPageType = {
    usersData: [],
};
const userReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
    switch (action.type) {
        //этот мап делает копию только того юзера, который нужно изменить, остальное ссылки (Shallow)
        case FOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        //делаем копию только того юзера, которого меняем
                        return {...u, isFollowed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, isFollowed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            //Дополняет инитстейт новыми юзерами, приходящими с сервака по нажатию кнопки show more
            return {
                ...state,
                usersData: [...state.usersData, ...action.newUsersData]
            }
        }
        default:
            return state
    }
}

export const followAC = (userId: string) => ({type: FOLLOW, userId} as const)
export const unfollowAC = (userId: string) => ({type: UNFOLLOW, userId} as const)
export const setUsersAC = (newUsersData: Array<UsersType>) => ({type: SET_USERS, newUsersData} as const)

export default userReducer;