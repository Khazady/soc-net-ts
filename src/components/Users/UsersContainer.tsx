import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {
    UsersType,
    toggleFollowingProgressAC, getUsersThunkCreator, unfollowTC, followTC
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import { Preloader } from "../common/Preloader/Preloader";

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
            <Users totalUsersCount={this.props.totalUsersCount}
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
    return {
        users: state.usersPage.usersData,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isLoading: state.usersPage.isLoading,
        isFollowingInProgress: state.usersPage.isFollowingInProgress
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
            dispatch(getUsersThunkCreator(currentPage, pageSize))
        }
    }
}


//коннектит контейнерную компоненту с UI-ной // комбайнит результаты обоих функций в один объект пропсов
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

/*export default connect(mapStateToProps,
           вместо MDtP записывает объект с AC (follow: followAC), но если из названия AC убрать "AC", то запись сокращается до 1 слова
                        {follow, unfollow, setUsers, setCurrentPage}
                (UsersContainer)*/