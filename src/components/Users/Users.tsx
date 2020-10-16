import styles from "./Users.module.css";
import userPhoto from "../../assets/images/default-user-avatar.png";
import React from "react";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

export type UsersPropsType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: any
    unfollow: any
    onPageChanger: (page: number) => void
    isFollowedInProgress: string[]
}

export const Users = (props: UsersPropsType) => {
    //логика для визуала, поэтому она в презентационной компоненте
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p =>
                    <span className={props.currentPage === p ? styles.selectedPage : styles.page}
                          onClick={() => {
                              props.onPageChanger(p)
                          }}>{p}</span>
                )}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={"/profile/" + u.id}>
                            <img
                                src={
                                    /*если фото отсутствует, то стандартная картинка*/
                                    u.photos.small != null ? u.photos.small : userPhoto}
                                className={styles.userPhoto}
                                alt={"avatar"}/>
                        </NavLink>
                    </div>
                    <div>
                        {u.followed ?
                            //если хоть кто-то из массива обрабатывающихся id совпадает с user id по которым мапимся, то true в disabled
                            <button disabled={props.isFollowedInProgress.some((id: string) => id === u.id)}
                                    onClick={() => {
                                        //меняет в стейте дизаблед кнопки на тру
                                        props.unfollow(u.id)
                                    }}>Unfollow</button>
                            : <button disabled={props.isFollowedInProgress.some((id: string) => id === u.id)}
                                      onClick={() => {
                                          props.follow(u.id)
                                      }}>Follow</button>
                        }</div>
                        </span>
                    <span>
                        <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                        </span>
                        <span>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                        </span>


                        {/*<button onClick={() => {*/}
                        {/*    this.props.setUsers()*/}
                        {/*}}>Show more</button>*/}


                        </span>
                </div>)
            }
        </div>
    )
}