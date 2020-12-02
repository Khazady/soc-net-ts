import React from 'react';
import classes from "./Navbar.module.css";
import {NavLink} from "react-router-dom";

function Navbar () {
    return <nav className={classes.nav}>
        <div className={classes.item}>
            <NavLink to="/soc-net-ts/profile" activeClassName={classes.activeLink}>Profile</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/soc-net-ts/dialogs" activeClassName={classes.activeLink}>Dialogs</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/soc-net-ts/users" activeClassName={classes.activeLink}>Users</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/soc-net-ts/news" activeClassName={classes.activeLink}>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/soc-net-ts/music" activeClassName={classes.activeLink}>Music</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to="/soc-net-ts/settings" activeClassName={classes.activeLink}>Settings</NavLink>
        </div>
    </nav>
}

export default Navbar;