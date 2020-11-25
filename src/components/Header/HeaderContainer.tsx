import React from 'react';
import Header from "./Header";
import {connect} from 'react-redux';
import {RootStateType} from "../../redux/redux-store";
import {logoutTC} from "../../redux/auth-reducer";


export type HeaderContainerPropsType = {
    isAuth: boolean
    isLoading: boolean
    login: string | null
    logout: () => void
}

const HeaderContainer: React.FC<HeaderContainerPropsType> = (props) => {
    return <Header {...props}/>
};

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading,
    login: state.auth.login
})

export default connect(mapStateToProps, {logout: logoutTC})(HeaderContainer);