import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {
    getUserProfile,
    getStatus,
    updateStatus,
    updatePhoto,
    updateProfile
} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileFormDataType} from "./ProfileInfo/ProfileInfo";

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
export type profileServerType = {
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
type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: string) => void
    getStatus: (userId: string) => void
    updateStatus: (status: string) => void
    updatePhoto: (photo: File | null | undefined) => void
    updateProfile: (changedProfile: profileServerType) => Promise<any>
}
type PathParamType = {
    userId: string | undefined
}
type PropsType = RouteComponentProps<PathParamType> & MapPropsType & DispatchPropsType


//1-ый контейнер для AJAX запросов, setInterval и т.д. (грязной работы), рисует презентационную
class ProfileContainer extends React.Component<PropsType> {
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
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
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
                        updateStatus={this.props.updateStatus}
          //если нет userId, то owner страницы (для показа кнопки загрузки фото)
                        isOwner={!this.props.match.params.userId}
                        updatePhoto={this.props.updatePhoto}
        />
    }
}

let mapStateToProps = (state: RootStateType) => {
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}
/*let mapDispatchToProps = (dispatch: any): DispatchPropsType => ({
    getUserProfile: (userId) => {
        dispatch(getUserProfileTC(userId))
    },
    getStatus: (userId) => {
        dispatch(getUserStatusTC(userId))
    },
    updateStatus: (status) => {
        dispatch(updateStatusTC(status))
    },
    updatePhoto: (photo => {
        dispatch(updatePhotoTC(photo))
    }),
    updateProfile: (changedProfile => {
        dispatch(updateProfileTC(changedProfile))
    })
})*/

export default compose(
  withAuthRedirect,
  withRouter,
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, updatePhoto, updateProfile})
)(ProfileContainer)