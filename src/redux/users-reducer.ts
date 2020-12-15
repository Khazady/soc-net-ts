import {BaseThunkType, UserType} from '../types/commonTypes'
import {toggleIsLoadingAC} from './app-reducer'
import {usersAPI} from '../api/user-api'

const initialState = {
    usersData: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    isFollowingInProgress: [] as Array<number>, // array of users Ids
    filter: {
        searchInput: '',
        friend: null as null | boolean
    }
}
export const userReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'USER/FOLLOW':
            //этот мап делает копию только того юзера, который нужно изменить, остальное ссылки (Shallow)
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        //делаем копию только того юзера, которого меняем
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'USER/UNFOLLOW':
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'USER/SET_USERS':
            //Дополняет инитстейт новыми юзерами, приходящими с сервака по нажатию кнопки show more
            return {
                ...state,
                usersData: action.newUsersData
            }
        case 'USER/SET_CURRENT_PAGE':
            return {...state, currentPage: action.pageNumber}
        case 'USER/SET_FILTER':
            return {...state, filter: action.payload}
        case 'USER/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case 'APP/TOGGLE_IS_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        case 'USER/TOGGLE_FOLLOWING_PROGRESS':
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgress
                    //если в action isFollowing true, то в конец массива айдишек(которые были нажаты) дописываем айди из action
                    ? [...state.isFollowingInProgress, action.userId]
                    //если false, то деструкт. не нужна, фильтр возвр. новый массив
                    //удаляет из массивы обрабатывающихся id, ту, что закончила обработку
                    : [state.isFollowingInProgress.filter((id) => id !== action.userId)]
            } as InitialStateType
        default:
            return state
    }
}

// actions
export const followSuccessAC = (userId: number) => ({type: 'USER/FOLLOW', userId} as const)
export const unfollowSuccessAC = (userId: number) => ({type: 'USER/UNFOLLOW', userId: userId} as const)
export const setUsersAC = (newUsersData: Array<UserType>) => ({type: 'USER/SET_USERS', newUsersData} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: 'USER/SET_CURRENT_PAGE', pageNumber} as const)
//filter of searching users
export const setFilterAC = (filter: FilterType) => ({type: 'USER/SET_FILTER', payload: filter} as const)
export const setTotalUsersCountAC = (totalUsersCount: number) => ({
    type: 'USER/SET_TOTAL_USERS_COUNT', totalUsersCount
} as const)
export const toggleFollowingProgressAC = (isFollowingInProgress: boolean, userId: number) => ({
    type: 'USER/TOGGLE_FOLLOWING_PROGRESS', isFollowingInProgress,
    userId
} as const)

// thunks
//AC возвращает объект, кот. мы можем задиспатчить, ThunkCreator возвр. функцию кот. мы можем задиспатчить
export const requestUsersTC = (currentPage: number, pageSize: number, filter: FilterType): BaseThunkType<ActionsType> =>
    async (dispatch) => {
        document.title = 'Users'
        //включаем крутилку до запроса на серв
        dispatch(toggleIsLoadingAC(true))
        const data = await usersAPI.getUsers(currentPage, pageSize, filter.searchInput, filter.friend)
        //после ответа сервера выполнится этот код
        dispatch(setFilterAC(filter))
        dispatch(setCurrentPageAC(currentPage))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))
        //выключаем после получения ответа
        dispatch(toggleIsLoadingAC(false))
    }

export const followTC = (userId: number): BaseThunkType<ActionsType> =>
    async (dispatch) => {
        //меняет в стейте дизаблед кнопки на тру
        dispatch(toggleFollowingProgressAC(true, userId))
        const data = await usersAPI.followUser(userId)
        if (data.resultCode === 0) {
            dispatch(followSuccessAC(userId))
        }
        //разблочивает кнопку после запроса
        dispatch(toggleFollowingProgressAC(false, userId))
    }

export const unfollowTC = (userId: number): BaseThunkType<ActionsType> =>
    async (dispatch) => {
        //меняет в стейте дизаблед кнопки на тру
        dispatch(toggleFollowingProgressAC(true, userId))
        //дожидаемся когда промис придет в состояние resolved
        const data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === 0) {
            dispatch(unfollowSuccessAC(userId))
        }
        //разблочивает кнопку после запроса
        dispatch(toggleFollowingProgressAC(false, userId))
    }

//types
export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType =
    | ReturnType<typeof followSuccessAC>
    | ReturnType<typeof unfollowSuccessAC>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalUsersCountAC>
    | ReturnType<typeof toggleFollowingProgressAC>
    | toggleIsLoadingAC
    | ReturnType<typeof setFilterAC>
