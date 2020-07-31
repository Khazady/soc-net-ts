import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {ActionsType, DialogsPageType} from "../../redux/store";
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs-reducer";

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    newMessageText: string
    dispatch: (action: ActionsType) => void
}

function Dialogs(props: DialogsPropsType) {
    /*мапим диалоги и сообщения*/
    let dialogElements =  props.dialogsPage.dialogsData.map((dialogItem) =>  <DialogItem name={dialogItem.name} id={dialogItem.id} avatar={dialogItem.avatar}/> )

    let messageElements = props.dialogsPage.messagesData.map(function (messageItem) {
        return (
          <Message id={messageItem.id} message={messageItem.message}/>
        )
    })

    let newMessageRef = React.createRef<HTMLTextAreaElement>();

    let sendMessage = () => {
        props.dispatch(addMessageActionCreator())
    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let action = updateNewMessageTextActionCreator(e.currentTarget.value)
        props.dispatch(action)
    }

    return (
      <div className={classes.dialogs}>
          <div className={classes.dialogsItem}>
              {dialogElements}
          </div>
          <div className={classes.messages}>
              {messageElements}
          </div>
          <div>
              <textarea ref={newMessageRef}
                        onChange={onMessageChange}
                        value={props.newMessageText}
                        placeholder="Type a message"/>
              <button onClick={sendMessage}>Send</button>
          </div>
      </div>
    )
}

export default Dialogs;