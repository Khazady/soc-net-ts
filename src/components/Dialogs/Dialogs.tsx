import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/dialogs-reducer";
import {AddMessageFormRedux} from "./AddMessageForm/AddMessageForm";

export type DialogsPropsType = {
    dialogsPage: DialogsPageType
    updateNewMessageBody: (body: any) => void
    sendMessage: (newMessageBody: string) => void
    isAuth: boolean
}

function Dialogs(props: DialogsPropsType) {

    let state = props.dialogsPage
    /*мапим диалоги и сообщения*/
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


    let addNewMessage = (values: any) => {
        props.sendMessage(values.newMessageText);
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
}


export default Dialogs;