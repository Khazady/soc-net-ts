import React from 'react';
import classes from "./Header.module.css";
import { NavLink } from 'react-router-dom';
import {HeaderContainerPropsType} from "./HeaderContainer";

function Header(props: HeaderContainerPropsType) {
    return <header className={classes.header}>
        <img src="https://i.ibb.co/HN350sc/70a3b023-88a2-4ebb-a063-784ca54ae184-200x200.png" alt="logo"/>

        <div className={classes.loginBlock}>
            {props.isAuth ? props.login :
              //показываем имя пользователя либо ссылку на страницу логина
              <NavLink to={"/login"}>Login</NavLink>
            }
        </div>
    </header>
}

export default Header;