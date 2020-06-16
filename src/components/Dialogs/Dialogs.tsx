import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {DialogsPageType} from "../../redux/state";

type DialogsPropsType = {
    state: DialogsPageType
}

function Dialogs(props: DialogsPropsType) {
    /*мапим диалоги и сообщения*/
    let dialogElements =  props.state.dialogsData.map((dialogItem) =>  <DialogItem name={dialogItem.name} id={dialogItem.id} avatar={dialogItem.avatar}/> )

    let messageElements = props.state.messagesData.map(function (messageItem) {
        return (
          <Message message={messageItem.message}/>
        )
    })

    let newMessageRef = React.createRef<HTMLTextAreaElement>();

    let sendMessage = () => {
        alert(newMessageRef.current?.value)
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
                        placeholder="Type a message"/>
              <button onClick={sendMessage}>Send</button>
          </div>
      </div>
    )
}

export default Dialogs;