import {v1} from "uuid";

export type PostTypes = {
    id: string
    message: string;
    likesCount: number;
};

export type DialogItemType = {
    name: string;
    id: number;
    avatar: string
};

export type MessageType = {
    message: string;
};

export type ProfilePageType = {
    postsData: Array<PostTypes>;
    newPostText: string
};

export type DialogsPageType = {
    dialogsData: Array<DialogItemType>;
    messagesData: Array<MessageType>;
    newMessageText: string
};

export type RootStateType = {
    profilePage: ProfilePageType;
    dialogsPage: DialogsPageType;
};


const ADD_POST = "ADD-POST";

const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

const ADD_MESSAGE = "ADD-MESSAGE";

const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

export let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: v1(), message: "Hi, how are you?", likesCount: 7},
                {id: v1(), message: "It's my first post", likesCount: 53},
                {id: v1(), message: "КУ", likesCount: 3},
            ],
            newPostText: ""
        },
        dialogsPage: {
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
                {message: "Hello"},
                {message: "What's up"},
                {message: "Privet"},
                {message: "Yo"},
                {message: "Yo"},
            ],
            newMessageText: "",
        },
    },
    _callSubscriber(state: RootStateType) {
    },

    getState() {
        return this._state
    },
    subscribe(observer: any) {
        this._callSubscriber = observer
        //в обсервер приходит rerender из index.tsx, где она вызывается и логика ререндера залетает в _callSubscriber
        //таким образом мы избегаем циклической зависимости??, если бы просто импортировали ререндер
    },

    dispatch(action: any) {
        if (action.type === ADD_POST) {
            let newPost = {id: v1(), message: this._state.profilePage.newPostText, likesCount: 0}
            this._state.profilePage.postsData.push(newPost);
            /*обнуление строки после ввода*/
            this._state.profilePage.newPostText = "";
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state)
        } else if (action.type === ADD_MESSAGE) {
            let newMessage = {message: this._state.dialogsPage.newMessageText}
            this._state.dialogsPage.messagesData.push(newMessage);
            this._state.dialogsPage.newMessageText = "";
            this._callSubscriber(this._state)
        } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.dialogsPage.newMessageText = action.newText;
            this._callSubscriber(this._state)
        }
    }
}

export const addPostActionCreator = () => {
    return { type: ADD_POST }
}

export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}

export const updateNewMessageTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_MESSAGE_TEXT,
        newText: text
    }
}

export const addMessageActionCreator = () => {
    return { type: ADD_MESSAGE }
}
