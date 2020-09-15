
import React from "react";
import styles from "./Users.module.css"
import {UsersPageType, UsersType} from "../../redux/users-reducer";
// import {v1} from "uuid";
// import * as axios from "axios"
// import userPhoto from "../../assets/images/default-user-avatar.png"

//пропсы берутся из объекта, сформированного функцией connect в контейнерном компоненте
type UsersPropsType = {
    usersPage: UsersPageType
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: Array<UsersType>) => void
}

export const Users = (props: UsersPropsType) => {
    let getUsers = () => {
        //эта проверка для избежания бага зацикливания прорисовки
        if (props.usersPage.usersData.length === 0) {
            //при get-запросе мы можем отправить на сервер только этот адрес
            // axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            //     //после ответа сервера выполнится этот код
            //     props.setUsers(response.data.items)
            // });
        }
    }

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {/*{*/}
        {/*    props.usersPage.usersData.map(u => <div key={u.id}>*/}
        {/*        <span>*/}
        {/*            <div><img*/}
        {/*              src={*/}
        {/*                /!*если фото отсутствует, то стандартная картинка*!/*/}
        {/*                u.photos.small != null ? u.photos.small : userPhoto}*/}
        {/*              className={styles.userPhoto}*/}
        {/*              alt={"avatar"}/>*/}
        {/*            </div>*/}
        {/*            <div>{u.isFollowed*/}
        {/*              ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button>*/}
        {/*              : <button onClick={() => props.follow(u.id)}>Follow</button>*/}
        {/*            }</div>*/}
        {/*        </span>*/}
        {/*        <span>*/}
        {/*            <span>*/}
        {/*                <div>{u.name}</div>*/}
        {/*                <div>{u.status}</div>*/}
        {/*            </span>*/}
        {/*            <span>*/}
        {/*                <div>{"u.location.city"}</div>*/}
        {/*                <div>{"u.location.country"}</div>*/}
        {/*            </span>*/}


        {/*            <button onClick={() => {*/}
        {/*                props.setUsers()*/}
        {/*            }}>Show more</button>*/}


        {/*        </span>*/}
        {/*    </div>)*/}
        {/*}*/}
    </div>
}
