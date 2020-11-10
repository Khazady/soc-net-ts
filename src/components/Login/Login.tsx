import React from "react";
import {RootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {loginDataType} from "../../api/api";
import {LoginReduxForm} from "./LoginForm/LoginForm";

const Login = (props: any) => {
    //сюда придет инфа по инпутам, собранная handleSubmit {login: 'что ввел', rememberMe: true} и тд
    const onSubmit = (formData: loginDataType) => {
        props.login({email: formData.email, password: formData.password, rememberMe: formData.rememberMe})
    }
    return <div>
        <h1>LOGIN</h1>
        <h2>{props.email}</h2>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

let mapStateToProps = (state: RootStateType) => ({form: state.form})
let mapDispatchToProps = (dispatch: any) => ({
    login: (loginData: loginDataType) => {
        dispatch(loginTC(loginData))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
