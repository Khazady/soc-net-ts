// Function that takes the whole state, extracts only what's needed for the component, and passes it to business in mStP
// Needed so that if we change the state architecture, we fix it in one place instead of every mStP
import {RootStateType} from './store'
import {createSelector} from 'reselect'

// Primitive selector
export const getUsersSelector = (state: RootStateType) => state.usersPage.usersData
// Selector with computations; reselect prevents re-render (useMemo), caching its values and recomputing only when getUsersSelector changes
export const getUsers = createSelector(getUsersSelector, (users) => users.filter(u => true))
export const getPageSize = (state: RootStateType) => {
    return state.usersPage.pageSize
}
export const selectTotalUsersCount = (state: RootStateType) => {
    return state.usersPage.totalUsersCount
}
export const selectCurrentPage = (state: RootStateType) => {
    return state.usersPage.currentPage
}
export const selectIsLoading = (state: RootStateType) => {
    return state.usersPage.isLoading
}
export const selectIsFollowingProgress = (state: RootStateType) => {
    return state.usersPage.isFollowingInProgress
}
export const selectUsersFilter = (state: RootStateType) => {
    return state.usersPage.filter
}