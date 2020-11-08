import {ActionsType} from "./redux-store";
import {usersAPI} from "../api/api";

type LocationType = {
    country: string
    city: string
}
export type UsersType = {
    id: string
    photos: any
    followed: boolean
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
    isFollowingInProgress: any
}


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const TOGGLE_IS_LOADING = "TOGGLE-IS-LOADING"
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS"

let initialState: UsersPageType = {
    usersData: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    isFollowingInProgress: []
};
const userReducer = (state: UsersPageType = initialState, action: ActionsType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            //этот мап делает копию только того юзера, который нужно изменить, остальное ссылки (Shallow)
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        //делаем копию только того юзера, которого меняем
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
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
        case TOGGLE_FOLLOWING_PROGRESS: {
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgress
                  //если в action isFollowing true, то в конец массива айдишек(которые были нажаты) дописываем айди из action
                  ? [...state.isFollowingInProgress, action.userId]
                  //если false, то деструкт. не нужна, фильтр возвр. новый массив
                  //удаляет из массивы обрабатывающихся id, ту, что закончила обработку
                  : [state.isFollowingInProgress.filter((id: string) => id !== action.userId)]
            }
        }
        default:
            return state
    }
}

export const followSuccessAC = (userId: string) => ({type: FOLLOW, userId} as const)
export const unfollowSuccessAC = (userId: string) => ({type: UNFOLLOW, userId: userId} as const)
export const setUsersAC = (newUsersData: Array<UsersType>) => ({type: SET_USERS, newUsersData} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber: pageNumber} as const)
export const setTotalUsersCountAC = (totalUsersCount: number) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const)
export const toggleIsLoadingAC = (isLoading: boolean) => ({type: TOGGLE_IS_LOADING, isLoading} as const)
export const toggleFollowingProgressAC = (isFollowingInProgress: boolean, userId: string) => ({
    type: TOGGLE_FOLLOWING_PROGRESS,
    isFollowingInProgress,
    userId
} as const)

//AC возвращает объект, кот. мы можем задиспатчить, ThunkCreator возвр. функцию кот. мы можем задиспатчить
export const getUsersThunkCreator = (currentPage: number, pageSize: number) => {
    return (dispatch: any) => {
        document.title = "Users";
        //включаем крутилку до запроса на серв
        dispatch(toggleIsLoadingAC(true));
        //вынесли axios запрос в отдельный файл (api.ts) там DAL
        usersAPI.getUsers(currentPage, pageSize)
          .then(data => {
              //после ответа сервера выполнится этот код
              dispatch(setCurrentPageAC(currentPage))
              dispatch(setUsersAC(data.items));
              dispatch(setTotalUsersCountAC(data.totalCount));
              //выключаем после получения ответа
              dispatch(toggleIsLoadingAC(false));
          });
    }
}

export const followTC = (userId: string) => {
    return (dispatch:any) => {
        //меняет в стейте дизаблед кнопки на тру
        dispatch(toggleFollowingProgressAC(true, userId));
        usersAPI.followUser(userId)
          .then(data => {
              if (data.resultCode === 0) {
                  dispatch(followSuccessAC(userId))
              }
              //разблочивает кнопку после запроса
              dispatch(toggleFollowingProgressAC(false, userId))
          })
    }
}
export const unfollowTC = (userId: string) => {
    return (dispatch: any) => {
        //меняет в стейте дизаблед кнопки на тру
        dispatch(toggleFollowingProgressAC(true, userId));
        usersAPI.unFollowUser(userId)
          .then(data => {
              if (data.resultCode == 0) {
                  dispatch(unfollowSuccessAC(userId))
              }
              //разблочивает кнопку после запроса
              dispatch(toggleFollowingProgressAC(false, userId))
          })
    }
}

export default userReducer;