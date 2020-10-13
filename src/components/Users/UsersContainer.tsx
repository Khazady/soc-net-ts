import {connect} from "react-redux";
import {ActionsType, RootStateType} from "../../redux/redux-store";
import {
    followAC,
    setCurrentPageAC,
    setTotalUsersCountAC,
    setUsersAC, toggleIsLoadingAC,
    unfollowAC,
    UsersType,
    toggleFollowingProgressAC
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";

//пропсы берутся из объекта, сформированного функцией connect ниже
type UserContainerProps = {
    users: Array<UsersType>
    currentPage: number
    totalUsersCount: number
    pageSize: number
    isLoading: boolean
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: Array<UsersType>) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleIsLoading: (isLoading: boolean) => void
    toggleFollowingProgress: (isFollowingInProgress: boolean, userId: string) => void
    isFollowingInProgress: string[]
}

class UsersContainer extends React.Component<UserContainerProps, any> {
    componentDidMount() {
        document.title = "Users";
        //включаем крутилку до запроса на серв
        this.props.toggleIsLoading(true);
        //вынесли axios запрос в отдельный файл (api.ts) там DAL
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
          .then(data => {
            //после ответа сервера выполнится этот код
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
            //выключаем после получения ответа
            this.props.toggleIsLoading(false)
        });
    }

    onPageChanger = (pageNumber: number) => {
        //включаем крутилку
        this.props.toggleIsLoading(true);
        //меняем страницу
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
          .then(data => {
            //после ответа сервера выполнится этот код
              debugger
            this.props.setUsers(data.items);
            //выключаем крутилку
            this.props.toggleIsLoading(false)
        });
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
                   toggleFollowingProgress={this.props.toggleFollowingProgress}
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
let mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    //передает в пропсах презентационной компоненте коллбеки, которая она может вызывать
    return {
        follow: (userId: string) => {
            //диспатчит результат работы AC
            dispatch(followAC(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (pageNumber: number) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        },
        toggleIsLoading: (isLoading: boolean) => {
            dispatch(toggleIsLoadingAC(isLoading))
        },
        toggleFollowingProgress: (isFollowingInProgress: boolean, userId: string) => {
            dispatch(toggleFollowingProgressAC(isFollowingInProgress, userId))
        }
    }
}


//коннектит контейнерную компоненту с UI-ной // комбайнит результаты обоих функций в один объект пропсов
export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)

/*export default connect(mapStateToProps,
           вместо MDtP записывает объект с AC (follow: followAC), но если из названия AC убрать "AC", то запись сокращается до 1 слова
                        {follow, unfollow, setUsers, setCurrentPage}
                (UsersContainer)*/