import React from 'react'
import {Redirect} from 'react-router-dom'
import {RootStateType} from "../redux/store";
import {connect} from "react-redux";

type MapStatePropsType = { isAuth: boolean }
type MapDispatchPropsType = {}
// Take only what's needed for redirect to make it unique
let mapStateToPropsForRedirect = (state: RootStateType) => ({isAuth: state.auth.isAuth})

//WCP wrapped component props
// Wrap the incoming component with redirect logic
export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
        // Extract isAuth from props so it's not passed to the wrapped component
        let {isAuth, ...restProps} = props
        // If not logged in, redirect to login
        if (!isAuth) return <Redirect to='/login'/>
        // Return the incoming component with its props
        return <WrappedComponent {...restProps as WCP}/>
    }
    // Use connect with only part of the state
    return connect<MapStatePropsType, MapDispatchPropsType, WCP, RootStateType>(
      mapStateToPropsForRedirect, {})
    (RedirectComponent);
}