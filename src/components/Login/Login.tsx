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
}

const Login = (props: any) => {
    //сюда придет инфа по инпутам, собранная handleSubmit {login: 'что ввел', rememberMe: true} и тд
    const onSubmit = (formData: LoginFormData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.isAuth) {
        return <Redirect to={"soc-net-ts/profile"}/>
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login: loginTC})(Login);
