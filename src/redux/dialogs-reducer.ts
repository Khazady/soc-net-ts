import {v1} from "uuid";
import {ActionsType, DialogsPageType} from "./store";


let initialState = {
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
    newMessageText: "",
};

const dialogsReducer = (state: DialogsPageType = initialState, action: ActionsType): DialogsPageType => {
    switch (action.type) {
        case "ADD-MESSAGE": {
            let stateCopy = {...state};
            let newMessage = {id: v1(), message: state.newMessageText}
            stateCopy.messagesData.push(newMessage);
            stateCopy.newMessageText = "";
            return stateCopy
        }
        case "UPDATE-NEW-MESSAGE-TEXT": {
            let stateCopy = {...state};
            stateCopy.newMessageText = action.newText;
            return stateCopy
        }
        default:
            return state;
    }
}

export const updateNewMessageTextActionCreator = (text: string) => {
    return {
        type: "UPDATE-NEW-MESSAGE-TEXT",
        newText: text
    } as const
}
export const addMessageActionCreator = () => ({type: "ADD-MESSAGE"} as const)

export default dialogsReducer;