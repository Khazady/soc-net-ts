import React from 'react'
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../redux/store'
import {logoutTC} from '../../redux/auth-reducer'

export const Header: React.FC = () => {
    const isAuth = useSelector<RootStateType, boolean>(state => state.auth.isAuth)
    const login = useSelector<RootStateType, string | null>(state => state.auth.login)

    const dispatch = useDispatch()
    const logout = () => dispatch(logoutTC())
    return (
        <header className={classes.header}>
            <img src="https://i.ibb.co/HN350sc/70a3b023-88a2-4ebb-a063-784ca54ae184-200x200.png" alt="logo"/>

            <div className={classes.loginBlock}>
                {isAuth
                    ? <div>{login} - <button onClick={logout}>Log Out</button></div> :
                    //показываем имя пользователя либо ссылку на страницу логина
                    <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}