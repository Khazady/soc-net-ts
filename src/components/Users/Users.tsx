import React from "react";
import styles from "./Users.module.css"
import {UsersPageType, UsersType} from "../../redux/users-reducer";
import {v1} from "uuid";

type UsersPropsType = {
    usersPage: UsersPageType
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: Array<UsersType>) => void
}

export const Users = (props: UsersPropsType) => {
    debugger
    if (props.usersPage.usersData.length === 0) {
        props.setUsers(
          [
              {
                  id: v1(),
                  photo: "https://sun9-52.userapi.com/impf/c850620/v850620789/dbf06/ncnopSVc-ag.jpg?size=200x0&quality=90&sign=0a5ea6a657e0ca24ddda16acc6acbc6c&ava=1",
                  isFollowed: false,
                  fullName: "Sergey",
                  status: "Hello, i'm a user",
                  location: {country: "Belarus", city: "Minsk"}
              },
          ]
        )}
    debugger
    return <div>
        {
            props.usersPage.usersData.map(u => <div key={u.id}>
                <span>
                    <div><img src={u.photo} className={styles.userPhoto}/></div>
                    <div>{ u.isFollowed
                            ? <button onClick={ () => props.unfollow(u.id)}>Unfollow</button>
                            : <button onClick={ () => props.follow(u.id)}>Follow</button>
                    }</div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.city}</div>
                        <div>{u.location.country}</div>
                    </span>


                    <button onClick={ () => {props.setUsers(
                      [
                          {
                              id: v1(),
                              photo: "https://sun9-52.userapi.com/impf/c850620/v850620789/dbf06/ncnopSVc-ag.jpg?size=200x0&quality=90&sign=0a5ea6a657e0ca24ddda16acc6acbc6c&ava=1",
                              isFollowed: false,
                              fullName: "Sergey",
                              status: "Hello, i'm a user",
                              location: {country: "Belarus", city: "Minsk"}
                          },
                          {
                              id: v1(),
                              photo: "https://sun9-52.userapi.com/impf/c850620/v850620789/dbf06/ncnopSVc-ag.jpg?size=200x0&quality=90&sign=0a5ea6a657e0ca24ddda16acc6acbc6c&ava=1",
                              isFollowed: true,
                              fullName: "Michael",
                              status: "Hello, i'm a user too",
                              location: {country: "Ukraine", city: "Kyiv"}
                          },
                          {
                              id: v1(),
                              photo: "https://sun9-52.userapi.com/impf/c850620/v850620789/dbf06/ncnopSVc-ag.jpg?size=200x0&quality=90&sign=0a5ea6a657e0ca24ddda16acc6acbc6c&ava=1",
                              isFollowed: false,
                              fullName: "Andrew",
                              status: "As i am",
                              location: {country: "USA", city: "Washington, D.C."}
                          },
                      ]
                    )}}>Show more</button>


                </span>
            </div>)
        }
    </div>
}