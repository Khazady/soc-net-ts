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
                                    /* if photo is absent, use default image */
                                    user.photos.small != null ? user.photos.small : userPhoto}
                                className={styles.userPhoto}
                                alt={'avatar'}/>
                        </NavLink>
                    </div>
                    <div>
                        {user.followed ?
                            // If any processing ID matches the user id we're mapping over, true in disabled
                            <button disabled={props.isFollowedInProgress.some((id) => id === user.id)}
                                    onClick={() => {
                                        // Change the button's disabled state in the store to true
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