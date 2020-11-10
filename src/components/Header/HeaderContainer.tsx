import React, {useEffect} from 'react';
import Header from "./Header";
import {connect} from 'react-redux';
import { RootStateType} from "../../redux/redux-store";
import {getAuthUserDataTC, logoutTC} from "../../redux/auth-reducer";


export type HeaderContainerPropsType = {
    isAuth: boolean
    isLoading: boolean
    login: string | null
    getAuthUserData: any
    logout: () => void
}

function HeaderContainer(props: HeaderContainerPropsType) {
    useEffect(() => {
        props.getAuthUserData();
    })
    return <Header {...props}/>
}

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading,
    login: state.auth.login
})

export default connect(mapStateToProps, {getAuthUserData: getAuthUserDataTC, logout: logoutTC})(HeaderContainer);