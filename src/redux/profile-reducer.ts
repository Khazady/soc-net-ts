import {v1} from "uuid";
import { ActionsType } from "./redux-store";

export type PostTypes = {
    id: string
    message: string;
    likesCount: number;
};
export type ProfilePageType = {
    postsData: Array<PostTypes>;
    newPostText: string
};

const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState: ProfilePageType = {
      postsData: [
          {id: v1(), message: "Hi, how are you?", likesCount: 7},
          {id: v1(), message: "It's my first post", likesCount: 53},
          {id: v1(), message: "КУ", likesCount: 3},
      ],
      newPostText: ""
  };
//Для самой первой отрисовки

const profileReducer = (state: ProfilePageType = initialState, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {id: v1(), message: state.newPostText, likesCount: 0};
            return {
                ...state,
                newPostText: "",
                postsData: [...state.postsData, newPost]
            };
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText
            };
        default:
            return state
    }
}

export const addPostActionCreator = () => ({type: ADD_POST} as const)
export const updateNewPostTextActionCreator = (text: string) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    } as const
}

export default profileReducer;