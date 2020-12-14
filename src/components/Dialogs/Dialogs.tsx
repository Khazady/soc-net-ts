import React, { FC } from "react";
import classes from "./Dialogs.module.css";
import {DialogItem} from "./DialogItem/DialogsItem";
import {Message} from "./Message/Message";
import {InitialStateType} from "../../redux/dialogs-reducer";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";

export type PropsType = {
    dialogsPage: InitialStateType
    addMessage: (newMessageText: string) => void
}

const Dialogs: FC<PropsType> = (props) => {
    const state = props.dialogsPage
    /*mapping of dialogs and messages*/
    let dialogElements = state.dialogsData.map((dialogItem) => {
      return <DialogItem name={dialogItem.name}
                  id={dialogItem.id}
                  key={dialogItem.id}
                  avatar={dialogItem.avatar}/>})
    let messageElements = state.messagesData.map(function (messageItem) {
        return (
          <Message id={messageItem.id} message={messageItem.message} key={messageItem.id}/>
        )
    })


    let addNewMessage = (values: {newMessageText: string}) => {
        props.addMessage(values.newMessageText);
    }

    return (
      <div className={classes.dialogs}>
          <div className={classes.dialogsItem}>
              {dialogElements}
          </div>
          <div className={classes.messages}>
              {messageElements}
          </div>
          <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    )
};


export default Dialogs;