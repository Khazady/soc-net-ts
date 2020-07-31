import {v1} from "uuid";
import profileReducer, {
    addPostActionCreator,
    addPostActionType,
    updateNewPostTextActionCreator,
    updateNewPostTextActionType
} from "./profile-reducer";
import dialogsReducer, {
    addMessageActionCreator,
    AddMessageActionType, updateNewMessageTextActionCreator,
    UpdateNewMessageTextActionType
} from "./dialogs-reducer";

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
    id: string
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

export type StoreType = {
    _state: RootStateType
    _callSubscriber: (state: RootStateType) => void
    getState: () => RootStateType
    subscribe: (observer: any) => void
    dispatch: (action: UpdateNewMessageTextActionType | AddMessageActionType | addPostActionType | updateNewPostTextActionType) => void
}

export type ActionsType =
//автоматическая типизация ActionCreator, добавить as const и убрать типизацию того, что выходит из функции(после кавычек)
  ReturnType<typeof addPostActionCreator> |
  ReturnType<typeof updateNewPostTextActionCreator> |
  ReturnType<typeof addMessageActionCreator> |
  ReturnType<typeof updateNewMessageTextActionCreator>

export let store: StoreType = {
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
                {id: v1(), message: "Hello"},
                {id: v1(), message: "What's up"},
                {id: v1(), message: "Privet"},
                {id: v1(), message: "Yo"},
                {id: v1(), message: "Yo"},
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
        //обновляем стейт
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}
