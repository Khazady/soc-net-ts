import React from "react";
import classes from "./../Dialogs.module.css";
import { NavLink } from "react-router-dom";
import { DialogItemType } from "../../../redux/store";

function DialogItem(props: DialogItemType) {
  return (
    <div className={classes.dialog}>
      <NavLink to={`/dialogs/${props.id}`}><img src={props.avatar} alt="avatar"/>{props.name}</NavLink>
    </div>
  );
}

export default DialogItem;
