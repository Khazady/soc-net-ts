import React from "react";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {LoginReduxForm} from "./LoginForm/LoginForm";
import { Redirect } from "react-router-dom";
import {RootStateType} from "../../redux/redux-store";

export type LoginFormData = {
    email: string,
    password: string,
    rememberMe: boolean
    captchaInput: string
}

const Login = (props: any) => {
    //сюда придет инфа по инпутам, собранная handleSubmit {login: 'что ввел', rememberMe: true} и тд
    const onSubmit = (formData: LoginFormData) => {
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

const mapStateToProps = (state: RootStateType) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login: loginTC})(Login);
