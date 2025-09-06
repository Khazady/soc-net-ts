import {v1} from 'uuid'
import {DialogItemType, MessageType} from "../types/commonTypes";

const initialState = {
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
    ] as Array<DialogItemType>,
    messagesData: [
        {id: v1(), message: "Hello"},
        {id: v1(), message: "What's up"},
        {id: v1(), message: "Privet"},
        {id: v1(), message: "Yo"},
        {id: v1(), message: "Yo"},
    ] as Array<MessageType>,
};

export const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD_MESSAGE':
            let newMessage = {id: v1(), message: action.newMessageText}
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
                // This statement overwrites the shallow copy of messagesData
                // messagesData array contains objects; we don't deep copy them since we don't modify them
                // dialogsData isn't deep copied; we don't plan to modify it
            };
        case 'DELETE_MESSAGE':
            return {
                ...state,
                messagesData: state.messagesData.filter(mess => mess.id !== action.messageId)
            }
        default:
            return state;
    }
}

// actions
export const addMessageAC = (newMessageText: string) => ({type: 'ADD_MESSAGE', newMessageText} as const)
export const deleteMessageAC = (messageId: string) => ({type: 'DELETE_MESSAGE', messageId} as const)

// types
export type InitialStateType = typeof initialState
type ActionsType =
  | ReturnType<typeof addMessageAC>
  | ReturnType<typeof deleteMessageAC>