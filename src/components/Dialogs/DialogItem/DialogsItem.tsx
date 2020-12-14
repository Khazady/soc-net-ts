import React from "react";
import classes from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import {DialogItemType} from "../../../types/commonTypes";

type PropsType = DialogItemType
export const DialogItem: React.FC<PropsType> = (props) => (
  <div className={classes.dialog}>
      <NavLink to={`/dialogs/${props.id}`}><img src={props.avatar} alt="avatar"/>{props.name}</NavLink>
  </div>
)
