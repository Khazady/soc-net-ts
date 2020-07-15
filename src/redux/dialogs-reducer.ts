import {v1} from "uuid";
import {DialogsPageType} from "./state";

const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

const dialogsReducer = (state: DialogsPageType, action: any) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {id: v1(), message: state.newMessageText}
            state.messagesData.push(newMessage);
            state.newMessageText = "";
            return state
        case UPDATE_NEW_MESSAGE_TEXT:
            state.newMessageText = action.newText;
            return state
        default:
            return state;
    }
}

export const updateNewMessageTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text
    }
}
export const addMessageActionCreator = () => ({type: ADD_MESSAGE})

export default dialogsReducer;