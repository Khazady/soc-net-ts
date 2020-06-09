import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem, { DialogItemType } from "./DialogItem/DialogsItem";
import Message, {MessageType} from "./Message/Message";

type DialogsPropsType = {
    dialogs: Array<DialogItemType>,
    messages: Array<MessageType>
}

function Dialogs(props: DialogsPropsType) {

    let dialogElements =  props.dialogs.map((dialogItem) =>  <DialogItem name={dialogItem.name} id={dialogItem.id}/> )

    let messageElements = props.messages.map(function (messageItem) {
        return (
          <Message message={messageItem.message}/>
        )
    })

    return (
      <div className={classes.dialogs}>
          <div className={classes.dialogsItem}>
              {dialogElements}
          </div>
          <div className={classes.messages}>
              {messageElements}
          </div>
      </div>
    )
}

export default Dialogs;