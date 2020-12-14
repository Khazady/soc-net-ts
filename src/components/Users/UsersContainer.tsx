import {connect} from "react-redux";
import {RootStateType} from "../../redux/store";
import {followTC, requestUsersTC, unfollowTC} from "../../redux/users-reducer";
import React, {Component} from "react";
import {UsersList} from "./UsersList";
import {Preloader} from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getIsFollowingProgress,
    getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {UserType} from "../../types/commonTypes";

type MapStatePropsType = {
    //from mstp
    users: Array<UserType>
    currentPage: number
    totalUsersCount: number
    pageSize: number
    isLoading: boolean
    isFollowingInProgress: Array<number> // array of users Ids
}
type MapDispatchPropsType = {
    //from mdtp
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}
type OwnProps = {
    //что передали непосредственно в пропсах
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnProps

class UsersContainer extends Component<PropsType> {
    componentDidMount() {
        //вызываем санку
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanger = (currentPage: number) => {
        this.props.getUsers(currentPage, this.props.pageSize);
    }

    render() {
        //после return --- если идет запрос на сервак, то отобразить крутилку
        return <>
            {this.props.isLoading ? <Preloader/> : null}
            <UsersList totalUsersCount={this.props.totalUsersCount}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       onPageChanger={this.onPageChanger}
                       users={this.props.users}
                       isFollowedInProgress={this.props.isFollowingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: RootStateType): MapStatePropsType => {
    //принимает стейт целиком, а возвращает только то, что нужно компоненте
    //выбираем стейт в селекторах, чтобы если что не менять все mstp, а поменять в 1 селекторе
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state),
        isFollowingInProgress: getIsFollowingProgress(state)
    }
}

export default compose<React.ComponentType>(
  withAuthRedirect,
  connect<MapStatePropsType, MapDispatchPropsType, OwnProps, RootStateType>(
    mapStateToProps,
    {follow: followTC, unfollow: unfollowTC, getUsers: requestUsersTC})
)(UsersContainer)
