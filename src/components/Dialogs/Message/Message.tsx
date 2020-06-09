import React from "react";
import classes from "./../Dialogs.module.css";

export type MessageType = {
    message: string
}

function Message(props: MessageType) {
    return (
      <div className={classes.message}>{props.message}</div>
    )
}


export default Message;