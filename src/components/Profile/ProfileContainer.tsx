import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/store";
import {getStatus, getUserProfile, updatePhoto, updateProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../types/commonTypes";

type MapStatePropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    updatePhoto: (photo: File) => void
    updateProfile: (changedProfile: ProfileType) => Promise<any>
}
type PathParamType = {
    userId: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamType>

//1-ый контейнер для AJAX запросов, setInterval и т.д. (грязной работы), рисует презентационную
class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        document.title = "Profile";
        //айди из URL (withRouter, Route)
        let userId: number | null = Number(this.props.match.params.userId)
        //если параметра userId нет (url выглядит как /profile/), то вставить айди, пришедший с сервака
        //если и он null, то "" (временно)
        if (!userId) {
            userId = this.props.authorizedUserId ? this.props.authorizedUserId : null
        }
        if (!userId) {
            console.error('userId should exists in URI params or in the state ("authorizedUserId")')
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
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
export default compose<React.ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, updatePhoto, updateProfile}),
  withRouter
)(ProfileContainer)