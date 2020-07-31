import React from "react";
import classes from "./../Dialogs.module.css";
import { MessageType } from "../../../redux/store";

function Message(props: MessageType) {
  return <div key={props.id} className={classes.message}>{props.message}</div>;
}

export default Message;
