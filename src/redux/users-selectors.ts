//функция кот принимает State целиком, достает только то, что нужно компоненте и передаёт это в бизнес в mStP
//это нужно, чтобы мы решим изменить архитектуру стейта, чтобы не исправлять в каждом mStP, мы исправим в 1 месте - здесь
import {RootStateType} from "./store";
import {createSelector} from "reselect"

//примитивный селектор
export const getUsersSelector = (state: RootStateType) => state.usersPage.usersData
//селектор с вычислениями, reselect предотвращает перерисовку ( useMemo ), кэшируя её значения и пересчитывает только при измен. в getUsersSelector
export const getUsers = createSelector(getUsersSelector, (users) => users.filter(u => true))
export const getPageSize = (state: RootStateType) => {
    return state.usersPage.pageSize
}
export const getTotalUsersCount = (state: RootStateType) => {
    return state.usersPage.totalUsersCount
}
export const getCurrentPage = (state: RootStateType) => {
    return state.usersPage.currentPage
}
export const getIsLoading = (state: RootStateType) => {
    return state.usersPage.isLoading
}
export const getIsFollowingProgress = (state: RootStateType) => {
    return state.usersPage.isFollowingInProgress
}