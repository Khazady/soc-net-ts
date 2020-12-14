import React from 'react';
import classes from "./Header.module.css";
import {NavLink} from 'react-router-dom';

export type MapStatePropsType = {
    isAuth: boolean
    isLoading: boolean
    login: string | null
}

export type MapDispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => <header className={classes.header}>
    <img src="https://i.ibb.co/HN350sc/70a3b023-88a2-4ebb-a063-784ca54ae184-200x200.png" alt="logo"/>

    <div className={classes.loginBlock}>
        {props.isAuth
          ? <div>{props.login} - <button onClick={props.logout}>Log Out</button></div> :
          //показываем имя пользователя либо ссылку на страницу логина
          <NavLink to={"/login"}>Login</NavLink>
        }
    </div>
</header>;

export default Header;