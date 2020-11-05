import React from 'react'
import {Redirect} from 'react-router-dom'
import {RootStateType} from "../redux/redux-store";
import {connect} from "react-redux";
import {MapStateToPropsForRedirectType} from '../components/Profile/ProfileContainer';

//берет только то, что нужно redirect, чтобы сделать его уникальным
let mapStateToPropsForRedirect = (state: RootStateType): MapStateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth
})

// Обертвываем приходящую компоненту в логику с Redirect
export const withAuthRedirect = (Component: any) => {
    class RedirectComponent extends React.Component<any, any> {
        render() {
            //если не залогинен, то редирект на логин
            if (!this.props.isAuth) return <Redirect to='/login'/>
            //возвращаем пришедший компонент с его пропсами
            return <Component {...this.props}/>
        }
    }

    //юзаем коннект только с половиной стейта
    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}