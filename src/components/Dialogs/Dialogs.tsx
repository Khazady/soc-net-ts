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
    let dialogsData: Array<DialogItemType> = [
        {id: 1, name: "Chris"},
        {id: 2, name: "Vicky"},
        {id: 3, name: "Mike"},
        {id: 4, name: "Alex"},
        {id: 5, name: "Ivan"},
    ]

    let messagesData: Array<MessageType> = [
        {message: "Hello"},
        {message: "What's up"},
        {message: "ЗДАРОВА"},
        {message: "Yo"},
        {message: "Yo"},
    ]


    return (
      <div className={classes.dialogs}>
          <div className={classes.dialogsItem}>
              <DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>

              {
                  dialogsData.map(function (dialogItem) {
                      return (
                        <DialogItem name={dialogItem.name} id={dialogItem.id}/>
                      )
                  })
              }

          </div>
          <div className={classes.messages}>
              <Message message={messagesData[0].message}/>
              {
                  messagesData.map(function (messageItem) {
                      return (
                        <Message message={messageItem.message}/>
                        )
                  })
              }
          </div>
      </div>
    )
}

export default Dialogs;