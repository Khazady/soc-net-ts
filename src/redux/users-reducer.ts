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
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isLoading: boolean
}


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const TOGGLE_IS_LOADING = "TOGGLE-IS-LOADING"

let initialState: UsersPageType = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false
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
                usersData: action.newUsersData
            }
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.pageNumber}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return state
    }
}

export const followAC = (userId: string) => ({type: FOLLOW, userId} as const)
export const unfollowAC = (userId: string) => ({type: UNFOLLOW, userId: userId} as const)
export const setUsersAC = (newUsersData: Array<UsersType>) => ({type: SET_USERS, newUsersData} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber: pageNumber} as const)
export const setTotalUsersCountAC = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const)
export const toggleIsLoadingAC = (isLoading: boolean) => ({type: TOGGLE_IS_LOADING, isLoading} as const)

export default userReducer;