import styles from './Users.module.css'
import userPhoto from '../../assets/images/default-user-avatar.svg'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {UserType} from '../../types/commonTypes'

type PropsType = {
    user: UserType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isFollowedInProgress: Array<number>
}

export const User: React.FC<PropsType> = ({user, ...props}) => (
    <div>
                <span>
                    <div>
                        <NavLink to={'/profile/' + user.id}>
                            <img
                                src={
                                    /*если фото отсутствует, то стандартная картинка*/
                                    user.photos.small != null ? user.photos.small : userPhoto}
                                className={styles.userPhoto}
                                alt={'avatar'}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            //если хоть кто-то из массива обрабатывающихся id совпадает с user id по которым мапимся, то true в disabled
                            <button disabled={props.isFollowedInProgress.some((id) => id === user.id)}
                                    onClick={() => {
                                        //меняет в стейте дизаблед кнопки на тру
                                        props.unfollow(user.id)
                                    }}>Unfollow</button>
                            : <button disabled={props.isFollowedInProgress.some((id) => id === user.id)}
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
            {/*<button onClick={() => {*/}
            {/*    this.props.setUsers()*/}
            {/*}}>Show more</button>*/}

                        </span>
    </div>
)