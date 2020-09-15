import React from "react";
import userPhoto from "../../assets/images/default-user-avatar.png";
import styles from "./Users.module.css";
import axios from "axios";
import {UsersPageType, UsersType} from "../../redux/users-reducer";

//пропсы берутся из объекта, сформированного функцией connect в контейнерном компоненте
type UsersPropsType = {
    users: Array<UsersType>
    follow: (userId: string) => void
    unfollow: (userId: string) => void
    setUsers: (users: Array<UsersType>) => void
}

class Users extends React.Component<UsersPropsType, any> {
    componentDidMount() {
        //при get-запросе мы можем отправить на сервер только этот адрес
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            //после ответа сервера выполнится этот код
            this.props.setUsers(response.data.items)
        });
    }

    render() {
        return <div>
            {
                this.props.users.map(u => <div key={u.id}>
                <span>
                    <div><img
                      src={
                          /*если фото отсутствует, то стандартная картинка*/
                          u.photos.small != null ? u.photos.small : userPhoto}
                      className={styles.userPhoto}
                      alt={"avatar"}/>
                    </div>
                    <div>{u.isFollowed
                      ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button>
                      : <button onClick={() => this.props.follow(u.id)}>Follow</button>
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
    }
}

export default Users;