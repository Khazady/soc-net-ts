import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {
    UsersType,
    toggleFollowingProgressAC, requestUsersTC, unfollowTC, followTC
} from "../../redux/users-reducer";
import React from "react";
import {UsersList} from "./UsersList";
import { Preloader } from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHOC";
import { compose } from "redux";
import {
    getCurrentPage,
    getPageSize,
    getTotalUsersCount,
    getUsers,
    getIsLoading,
    getIsFollowingProgress
} from "../../redux/users-selectors";

//пропсы берутся из объекта, сформированного функцией connect ниже
type UserContainerProps = {
    users: Array<UsersType>
    currentPage: number
    totalUsersCount: number
    pageSize: number
    isLoading: boolean
    follow: any
    unfollow: any
    toggleFollowingProgress: (isFollowingInProgress: boolean, userId: string) => void
    isFollowingInProgress: string[]
    getUsers: any
}

class UsersContainer extends React.Component<UserContainerProps, any> {
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

let mapStateToProps = (state: RootStateType) => {
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
let mapDispatchToProps = (dispatch: (action: any) => void) => {
    //передает в пропсах презентационной компоненте коллбеки, которая она может вызывать
    return {
        follow: (userId: string) => {
            debugger
            //диспатчит результат работы AC
            dispatch(followTC(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowTC(userId))
        },
        toggleFollowingProgress: (isFollowingInProgress: boolean, userId: string) => {
            dispatch(toggleFollowingProgressAC(isFollowingInProgress, userId))
        },
        getUsers: (currentPage: number, pageSize: number) => {
            dispatch(requestUsersTC(currentPage, pageSize))
        }
    }
}


export default compose(
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer)
