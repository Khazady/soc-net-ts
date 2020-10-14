import React, {useEffect} from 'react';
import Header from "./Header";
import {connect} from 'react-redux';
import { RootStateType} from "../../redux/redux-store";
import {authTC, setAuthUserDataAC} from "../../redux/auth-reducer";
import {headerAPI} from "../../api/api";


export type HeaderContainerPropsType = {
    isAuth: boolean
    isLoading: boolean
    login: string | null
    setAuthUserData: (id: number|null, login: string|null, email: string|null) => void
}

function HeaderContainer(props: HeaderContainerPropsType) {
    useEffect(() => {
        authTC();
    })
    return <Header {...props}/>
}

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading,
    login: state.auth.login
})

export default connect(mapStateToProps, {setAuthUserData: setAuthUserDataAC})(HeaderContainer);