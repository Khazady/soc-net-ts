import styles from "./Users.module.css";
import userPhoto from "../../assets/images/default-user-avatar.png";
import React from "react";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import axios from "axios";

export type UsersPropsType = {
    users: Array<UsersType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    onPageChanger: (page: number) => void
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
                    <div>{u.isFollowed
                      ? <button onClick={() => {
                          //в get и delete настройки 2 параметр, в post 3-ий
                          axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                              withCredentials: true
                          }).then(response => {
                              //если инфа на сервере поменялась ( 0 - успешно), то диспатчим и в своем стейте
                              if (response.data.resultCode == 0) {
                                  props.follow(u.id)
                              }
                          });
                      }}>Follow</button>
                      : <button onClick={() => {
                          axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                              withCredentials: true
                          }).then(response => {
                              //если инфа на сервере поменялась ( 0 - успешно), то диспатчим и в своем стейте
                              if (response.data.resultCode == 0) {
                                  props.follow(u.id)
                              }
                          });
                      }}>Unfollow</button>
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