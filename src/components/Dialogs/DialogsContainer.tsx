import React from "react";
import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { StoreContext } from "../../StoreContext";

function DialogsContainer() {

    return <StoreContext.Consumer>
        { store => {
            let state = store.getState().dialogsPage;

            let sendMessage = () => {
                store.dispatch(addMessageActionCreator())
            }

            let onMessageChange = (body: string) => {
                let action = updateNewMessageTextActionCreator(body)
                store.dispatch(action)
            }
            return <Dialogs updateNewMessageBody={onMessageChange} sendMessage={sendMessage} dialogsPage={state}/>
        }
    }
    </StoreContext.Consumer>
}


export default DialogsContainer;