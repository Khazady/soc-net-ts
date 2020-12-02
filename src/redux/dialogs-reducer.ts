import {v1} from "uuid";
import {ActionsType} from "./redux-store";

export type DialogItemType = {
    name: string;
    id: number;
    avatar: string
};
export type MessageType = {
    id: string
    message: string;
};
export type DialogsPageType = {
    dialogsData: Array<DialogItemType>;
    messagesData: Array<MessageType>;
};



let initialState: DialogsPageType = {
    dialogsData: [
        {
            id: 1,
            name: "Chris",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chris_Pratt_2018.jpg"
        },
        {
            id: 2,
            name: "Vicky",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Victoria_Justice_2013.jpg"
        },
        {
            id: 3,
            name: "Mike",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/1200px-Mike_Tyson_2019_by_Glenn_Francis.jpg"
        },
        {
            id: 4,
            name: "Alex",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chris_Pratt_2018.jpg"
        },
        {
            id: 5,
            name: "Ivan",
            avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chris_Pratt_2018.jpg"
        },
    ],
    messagesData: [
        {id: v1(), message: "Hello"},
        {id: v1(), message: "What's up"},
        {id: v1(), message: "Privet"},
        {id: v1(), message: "Yo"},
        {id: v1(), message: "Yo"},
    ],
};

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType => {
    switch (action.type) {
        case "ADD-MESSAGE":
            let newMessage = {id: v1(), message: action.newMessageText}
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage ]
                //эта запись перезатирает shallow-копию messagesData
                //массив messagesData содержит объекты, мы их глубоко не копируем, т.к. не изменяем
                //dialogsData глубоко не копируем, не собираемся изменять
            };
        case "DELETE-MESSAGE":
            return {
                ...state,
                messagesData: state.messagesData.filter(mess => mess.id !== action.messageId)
            }
        default:
            return state;
    }
}


export const addMessageAC = (newMessageText: string) => ({type: "ADD-MESSAGE", newMessageText} as const)
export const deleteMessageAC = (messageId: string) => ({type: "DELETE-MESSAGE", messageId} as const)

export default dialogsReducer;