import React from 'react';
import Header, {MapDispatchPropsType, MapStatePropsType} from "./Header";
import {connect} from 'react-redux';
import {RootStateType} from "../../redux/store";
import {logoutTC} from "../../redux/auth-reducer";

const HeaderContainer: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    return <Header {...props}/>
};

const mapStateToProps = (state: RootStateType) => ({
    isAuth: state.auth.isAuth,
    isLoading: state.auth.isLoading,
    login: state.auth.login
})

export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapStateToProps, {logout: logoutTC})(HeaderContainer);