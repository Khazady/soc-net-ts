import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {getUserProfileTC, getUserStatusTC, updateStatusTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHOC";
import {compose} from "redux";

//типы объектов с серва (то, что должен возвращать MStP
type profileContactsServerType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
type profilePhotosServerType = {
    small: string | null
    large: string | null
}
type profileServerType = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: profileContactsServerType
    photos: profilePhotosServerType
}
export type MapStateToPropsForRedirectType = {
    isAuth: boolean
}
type MapStateToPropsType = {
    profile: profileServerType
    status: string
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType
type PathParamType = {
    userId: string | undefined
}
type PropsType = RouteComponentProps<PathParamType> & OwnPropsType




//1-ый контейнер для AJAX запросов, setInterval и т.д. (грязной работы), рисует презентационную
class ProfileContainer extends React.Component<PropsType, any> {

    componentDidMount() {
        document.title = "Profile";
        //айди из URL (withRouter, Route)
        let userId = this.props.match.params.userId;
        //если параметра userId нет (url выглядит как /profile/), то вставить 2
        if (!userId) {
            userId = '9313';
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        //копирует и передает все пропсы
        return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
    }
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})
let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => ({
    getUserProfile: (userId) => {
        dispatch(getUserProfileTC(userId))
    },
    getUserStatus: (userId) => {
        dispatch(getUserStatusTC(userId))
    },
    updateUserStatus: (status) => {
        dispatch(updateStatusTC(status))
    }
})

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer)