import React, {Props} from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ActionsType, RootStateType} from "../../redux/redux-store";
import {ProfilePageType, setProfileAC} from "../../redux/profile-reducer";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {profileAPI} from "../../api/api";
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
type MapStateToPropsType = {
    profile: profileServerType
}
type MapDispatchToPropsType = {
    setProfile: (profile: ProfilePageType) => void
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
            userId = '2';
        }
        //при get-запросе мы можем отправить на сервер только адрес
        profileAPI.getProfiles(userId)
          .then(data => {
            this.props.setProfile(data)
        });
    }

    render() {
        //копирует и передает все пропсы
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}


//2-ой контейнер для получения данных из URL, закидывает в 1-ую дату из урла
let WithURLDataContainerComponent = withRouter(ProfileContainer)


let mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile
})
let mapDispatchToProps = (dispatch: (action: ActionsType) => void): MapDispatchToPropsType => ({
    setProfile: (profile) => {
        dispatch(setProfileAC(profile))
    }
})
//3-ий контейнер для  связи со стором и создания финальных пропсов, закинет в 1-ую через 2-ую нужные пропсы из стора
export default connect(mapStateToProps, mapDispatchToProps)(WithURLDataContainerComponent)
