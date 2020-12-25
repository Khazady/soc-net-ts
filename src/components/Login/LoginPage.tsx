import React, {FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {loginTC} from '../../redux/auth-reducer'
import {LoginReduxForm} from './LoginForm/LoginForm'
import {Redirect} from 'react-router-dom'
import {RootStateType} from '../../redux/store'

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
    captchaInput: string
}
export const LoginPage: FC = () => {
    const captchaUrl = useSelector<RootStateType, string | null>(state => state.auth.captchaUrl)
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)

    const dispatch = useDispatch()
    //сюда придет инфа по инпутам, собранная handleSubmit {login: 'что ввел', rememberMe: true} и тд
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(loginTC(formData.email, formData.password, formData.rememberMe, formData.captchaInput))
    }

    if(isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}