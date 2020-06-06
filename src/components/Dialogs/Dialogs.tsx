import React from "react";
import classes from "./Dialogs.module.css";
import {NavLink} from "react-router-dom";

type DialogItemType = {
    name: string
    id: number
}
function DialogItem(props: DialogItemType) {
    return (
      <div className={classes.dialog}>
          <NavLink to={`/dialogs/${props.id}`}>{props.name}</NavLink>
      </div>
    )
}

type MessageType = {
    message: string
}
function Message(props: MessageType) {
    return (
      <div className={classes.message}>{props.message}</div>
    )
}

function Dialogs() {
    return (
      <div className={classes.dialogs}>
          <div className={classes.dialogsItem}>
              <DialogItem name="Chris" id={1}/>
              <DialogItem name="Vicky" id={2}/>
              <DialogItem name="Mike" id={3}/>
              <DialogItem name="Alex" id={4}/>
              <DialogItem name="Ivan" id={5}/>
          </div>
          <div className={classes.messages}>
              <Message message="Hello"/>
              <Message message="What's up!"/>
              <Message message="ЗДАРОВА"/>
          </div>
      </div>
    )
}

export default Dialogs;