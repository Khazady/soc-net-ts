// Function that takes the whole state, extracts only what's needed for the component, and passes it to business in mStP
// Needed so that if we decide to change the state architecture, we fix it in one place – here
import {RootStateType} from './store'


export const selectIsAuth = (state: RootStateType) => {
    return state.auth.isAuth
}
export const selectCurrentUserLogin = (state: RootStateType) => {
    return state.auth.login
}