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
        term: '',
        friend: null as null | boolean
    }
}
export const userReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'USER/FOLLOW':
            // This map copies only the user that needs to be changed; others remain by reference (shallow)
            return {
                ...state,
                usersData: state.usersData.map(u => {
                    if (u.id === action.userId) {
                        // Copy only the user we are changing
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
            // Adds new users from the server to the initial state when clicking the show more button
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
                    // If action.isFollowing is true, append userId from action to the array of clicked IDs
                    ? [...state.isFollowingInProgress, action.userId]
                    // If false, destructuring isn't needed; filter returns a new array
                    // Remove from processing IDs array the one that finished processing
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
// Action creator returns an object we can dispatch; ThunkCreator returns a function we can dispatch
export const requestUsersTC = (currentPage: number, pageSize: number, filter: FilterType): BaseThunkType<ActionsType> =>
    async (dispatch) => {
        document.title = 'Users'
        // Turn on the spinner before sending the request to the server
        dispatch(toggleIsLoadingAC(true))
        const data = await usersAPI.getUsers(currentPage, pageSize, filter.term, filter.friend)
        // After server response, execute this code
        dispatch(setFilterAC(filter))
        dispatch(setCurrentPageAC(currentPage))
        dispatch(setUsersAC(data.items))
        dispatch(setTotalUsersCountAC(data.totalCount))
        // Turn it off after receiving the response
        dispatch(toggleIsLoadingAC(false))
    }

export const followTC = (userId: number): BaseThunkType<ActionsType> =>
    async (dispatch) => {
        // Change the button's disabled state in the store to true
        dispatch(toggleFollowingProgressAC(true, userId))
        const data = await usersAPI.followUser(userId)
        if (data.resultCode === 0) {
            dispatch(followSuccessAC(userId))
        }
        // Unlock the button after the request
        dispatch(toggleFollowingProgressAC(false, userId))
    }

export const unfollowTC = (userId: number): BaseThunkType<ActionsType> =>
    async (dispatch) => {
        // Change the button's disabled state in the store to true
        dispatch(toggleFollowingProgressAC(true, userId))
        // Wait for the promise to resolve
        const data = await usersAPI.unfollowUser(userId)
        if (data.resultCode === 0) {
            dispatch(unfollowSuccessAC(userId))
        }
        // Unlock the button after the request
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
