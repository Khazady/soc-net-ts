import React from 'react'
import {Redirect} from 'react-router-dom'
import {RootStateType} from "../redux/store";
import {connect} from "react-redux";

type MapStatePropsType = { isAuth: boolean }
type MapDispatchPropsType = {}
//берет только то, что нужно redirect, чтобы сделать его уникальным
let mapStateToPropsForRedirect = (state: RootStateType) => ({isAuth: state.auth.isAuth})

//WCP wrapped component props
// Обертвываем приходящую компоненту в логику с Redirect
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        //забираем isAuth из props, чтобы не передавать его в WrappedComp
        let {isAuth, ...restProps} = props
        //если не залогинен, то редирект на логин
        if (!isAuth) return <Redirect to='/login'/>
        //возвращаем пришедший компонент с его пропсами
        return <WrappedComponent {...restProps as WCP}/>
    }
    //юзаем коннект только с половиной стейта
    return connect<MapStatePropsType, MapDispatchPropsType, WCP, RootStateType>(
      mapStateToPropsForRedirect, {})
    (RedirectComponent);
}