import styles from "./Users.module.css";
import userPhoto from "../../assets/images/default-user-avatar.png";
import React from "react";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {followAPI} from "../../api/api";

export type UsersPropsType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onPageChanger: (page: number) => void
    toggleFollowingProgress: (isFollowingInProgress: boolean, userId: string) => void
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
                      onClick={() => props.onPageChanger(p)}>
                      {p}</span>
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
                          <button disabled={props.isFollowedInProgress.some((id: string) => id === u.id)} onClick={() => {
                              //меняет в стейте дизаблед кнопки на тру
                              props.toggleFollowingProgress(true, u.id);
                              followAPI.unFollowUser(u.id)
                                .then(data => {
                                    if (data.resultCode == 0) {
                                        props.unfollow(u.id)
                                    }
                                    //разблочивает кнопку после запроса
                                    props.toggleFollowingProgress(false, u.id);
                                });
                          }}>Unfollow</button>
                          : <button disabled={props.isFollowedInProgress.some((id: string) => id === u.id)} onClick={() => {
                              props.toggleFollowingProgress(true, u.id);
                              //в get и delete настройки 2 параметр, в post 3-ий
                              followAPI.followUser(u.id)
                                .then(data => {
                                    //если инфа на сервере поменялась ( 0 - успешно), то диспатчим и в своем стейте
                                    if (data.resultCode == 0) {
                                        props.follow(u.id)
                                    }
                                    props.toggleFollowingProgress(false, u.id);
                                });
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