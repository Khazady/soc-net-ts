import React, {ChangeEvent} from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/store";

type DialogsPropsType = {
    dialogsPage: DialogsPageType
    updateNewMessageBody: (body: any) => void
    sendMessage: () => void
}

function Dialogs(props: DialogsPropsType) {

    let state = props.dialogsPage
    /*мапим диалоги и сообщения*/
    let dialogElements =  state.dialogsData.map((dialogItem) =>  <DialogItem name={dialogItem.name} id={dialogItem.id} avatar={dialogItem.avatar}/> )

    let messageElements = state.messagesData.map(function (messageItem) {
        return (
          <Message id={messageItem.id} message={messageItem.message}/>
        )
    })

    let newMessageRef = React.createRef<HTMLTextAreaElement>();

    let sendMessage = () => {
        props.sendMessage();
    }

    let onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessageBody(e.currentTarget.value)
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
                        value={props.dialogsPage.newMessageText}
                        placeholder="Type a message"/>
              <button onClick={sendMessage}>Send</button>
          </div>
      </div>
    )
}

export default Dialogs;