import React from 'react'
import classes from './Dialogs.module.css'
import {DialogItem} from './DialogItem/DialogsItem'
import {Message} from './Message/Message'
import {AddMessageFormRedux} from './AddMessageForm/AddMessageForm'
import {useDispatch, useSelector} from 'react-redux'
import {RootStateType} from '../../redux/store'
import {DialogItemType, MessageType} from '../../types/commonTypes'
import {addMessageAC} from '../../redux/dialogs-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import {compose} from 'redux'


const Dialogs: React.FC = withAuthRedirect(() => {
    const dialogsData = useSelector<RootStateType, Array<DialogItemType>>(state => state.dialogsPage.dialogsData)
    const messagesData = useSelector<RootStateType, Array<MessageType>>(state => state.dialogsPage.messagesData)

    const dispatch = useDispatch()
    const addNewMessage = (values: { newMessageText: string }) => {
        dispatch(addMessageAC(values.newMessageText))
    }

    /*mapping of dialogs and messages*/
    let dialogElements = dialogsData.map(dialogItem => <DialogItem name={dialogItem.name}
                                                                   id={dialogItem.id}
                                                                   key={dialogItem.id}
                                                                   avatar={dialogItem.avatar}/>)
    let messageElements = messagesData.map(messageItem => <Message id={messageItem.id} message={messageItem.message}
                                                                   key={messageItem.id}/>)

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
})

export default compose<React.ComponentType>(withAuthRedirect)(Dialogs)