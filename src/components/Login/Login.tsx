import React, {FC} from "react"
import {connect} from "react-redux"
import {loginTC} from "../../redux/auth-reducer"
import {LoginReduxForm} from "./LoginForm/LoginForm"
import {Redirect} from "react-router-dom"
import {RootStateType} from "../../redux/store"

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean
    captchaInput: string
}
type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captchaInput: string) => void
}

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    //сюда придет инфа по инпутам, собранная handleSubmit {login: 'что ввел', rememberMe: true} и тд
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captchaInput)
    }

    if(props.isAuth) {
        return <Redirect to={"/profile"}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}

const mapStateToProps = (state: RootStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login: loginTC})(Login)
