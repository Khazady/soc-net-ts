import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/store";
import {getStatusTC, getUserProfileTC, updatePhotoTC, updateProfileTC, updateStatusTC} from "../../redux/profile-reducer";
import {withRouter, RouteComponentProps} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {ProfileType} from "../../types/commonTypes";

//todo: refactor to hooks
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

// First container for AJAX requests, setInterval, etc. (dirty work), renders the presentational component
class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        document.title = "Profile";
        // id from URL (withRouter, Route)
        let userId: number | null = Number(this.props.match.params.userId)
        // If the userId parameter is missing (URL looks like /profile/), insert the id from the server
        // If it's also null, then "" (temporary)
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
        // To update the component if we change the user after mounting
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        // Copy and pass all props
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
          // If there's no userId, then the page owner (for showing the upload photo button)
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
  connect(mapStateToProps, {getUserProfile: getUserProfileTC, getStatus: getStatusTC, updateStatus: updateStatusTC, updatePhoto: updatePhotoTC, updateProfile: updateProfileTC}),
  withRouter
)(ProfileContainer)