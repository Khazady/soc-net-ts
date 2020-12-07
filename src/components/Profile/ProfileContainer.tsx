import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {getUserProfileTC, getUserStatusTC, updateStatusTC, savePhotoTC} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
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
    authorizedUserId: number | null
    isAuth: boolean
}
type MapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
    savePhoto: (photo: File | null | undefined) => void
}
type OwnPropsType = MapStateToPropsType & MapDispatchToPropsType
type PathParamType = {
    userId: string | undefined
}
type PropsType = RouteComponentProps<PathParamType> & OwnPropsType


//1-ый контейнер для AJAX запросов, setInterval и т.д. (грязной работы), рисует презентационную
class ProfileContainer extends React.Component<PropsType, any> {
    refreshProfile() {
        document.title = "Profile";
        //айди из URL (withRouter, Route)
        let userId = this.props.match.params.userId;
        //если параметра userId нет (url выглядит как /profile/), то вставить айди, пришедший с сервака
        //если и он null, то "" (временно)
        if (!userId) {
            userId = this.props.authorizedUserId ? this.props.authorizedUserId.toString() : ""
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<MapStateToPropsType>) {
        //чтобы компонента обновлялась, если после вмонтирования меняем юзера
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()

        }
    }

    render() {
        //копирует и передает все пропсы
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateUserStatus={this.props.updateUserStatus}
          //если нет userId, то owner страницы (для показа кнопки загрузки фото)
                        isOwner={!this.props.match.params.userId}
                        savePhoto={this.props.savePhoto}
        />
    }
}

let mapStateToProps = (state: RootStateType): MapStateToPropsType => {
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}
let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => ({
    getUserProfile: (userId) => {
        dispatch(getUserProfileTC(userId))
    },
    getUserStatus: (userId) => {
        dispatch(getUserStatusTC(userId))
    },
    updateUserStatus: (status) => {
        dispatch(updateStatusTC(status))
    },
    savePhoto: (photo => {
        dispatch(savePhotoTC(photo))
    })
})

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer)