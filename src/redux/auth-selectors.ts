//функция кот принимает State целиком, достает только то, что нужно компоненте и передаёт это в бизнес в mStP
//это нужно, чтобы мы решим изменить архитектуру стейта, чтобы не исправлять в каждом mStP, мы исправим в 1 месте - здесь
import {RootStateType} from './store'


export const selectIsAuth = (state: RootStateType) => {
    return state.auth.isAuth
}
export const selectCurrentUserLogin = (state: RootStateType) => {
    return state.auth.login
}