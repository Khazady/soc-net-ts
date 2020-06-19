import { v1 } from "uuid";
import {rerenderEntireTree} from "../render";

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
};

export type RootStateType = {
  profilePage: ProfilePageType;
  dialogsPage: DialogsPageType;
};

let state: RootStateType = {
  profilePage: {
    postsData: [
      { id: v1(), message: "Hi, how are you?", likesCount: 7 },
      { id: v1(), message: "It's my first post", likesCount: 53 },
      { id: v1(), message: "КУ", likesCount: 3 },
    ],
    newPostText: ""
  },
  dialogsPage: {
    dialogsData: [
      { id: 1, name: "Chris", avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chris_Pratt_2018.jpg" },
      { id: 2, name: "Vicky", avatar: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Victoria_Justice_2013.jpg" },
      { id: 3, name: "Mike", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Mike_Tyson_2019_by_Glenn_Francis.jpg/1200px-Mike_Tyson_2019_by_Glenn_Francis.jpg"  },
      { id: 4, name: "Alex", avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chris_Pratt_2018.jpg" },
      { id: 5, name: "Ivan", avatar: "https://upload.wikimedia.org/wikipedia/commons/9/99/Chris_Pratt_2018.jpg" },
    ],
    messagesData: [
      { message: "Hello" },
      { message: "What's up" },
      { message: "Privet" },
      { message: "Yo" },
      { message: "Yo" },
    ],
  },
};


export const addPost = ()  => {
  const newPost = {id: v1(), message: state.profilePage.newPostText, likesCount: 0}
  state.profilePage.postsData.push(newPost);
  /*обнуление строки после ввода*/
  state.profilePage.newPostText = "";
  rerenderEntireTree(state)
}

export const updateNewPostText = (newText: string) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state)
}

export default state;
