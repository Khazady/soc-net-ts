import styles from "./Users.module.css";
import userPhoto from "../../assets/images/default-user-avatar.svg";
import React from "react";
import {UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

export type UserPropsType = {
    user: UsersType
    follow: any
    unfollow: any
    isFollowedInProgress: string[]
}

export const User: React.FC<UserPropsType> = ({user, ...props}) => (
    <div>
                <span>
                    <div>
                        <NavLink to={"/profile/" + user.id}>
                            <img
                                src={
                                    /*если фото отсутствует, то стандартная картинка*/
                                    user.photos.small != null ? user.photos.small : userPhoto}
                                className={styles.userPhoto}
                                alt={"avatar"}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            //если хоть кто-то из массива обрабатывающихся id совпадает с user id по которым мапимся, то true в disabled
                            <button disabled={props.isFollowedInProgress.some((id: string) => id === user.id)}
                                    onClick={() => {
                                        //меняет в стейте дизаблед кнопки на тру
                                        props.unfollow(user.id)
                                    }}>Unfollow</button>
                            : <button disabled={props.isFollowedInProgress.some((id: string) => id === user.id)}
                                      onClick={() => {
                                          props.follow(user.id)
                                      }}>Follow</button>
                        }</div>
                        </span>
        <span>
                        <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                        </span>
                        <span>
                        <div>{"u.location.city"}</div>
                        <div>{"u.location.country"}</div>
                        </span>

            {/*<button onClick={() => {*/}
            {/*    this.props.setUsers()*/}
            {/*}}>Show more</button>*/}

                        </span>
    </div>
)