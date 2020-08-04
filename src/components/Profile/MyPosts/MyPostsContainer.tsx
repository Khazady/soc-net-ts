import React from "react";
import classes from "./MyPosts.module.css";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {StoreContext} from "../../../StoreContext";


const MyPostsContainer = () => {

    return <StoreContext.Consumer>
        { (store) => {

            let state = store.getState();

            let addPost = () => {
                store.dispatch(addPostActionCreator());
            }

            let onPostChange = (text: string) => {
                let action = updateNewPostTextActionCreator(text)
                store.dispatch(action)
            }
            return <MyPosts updateNewPostText={onPostChange}
                            addPost={addPost}
                            posts={state.profilePage.postsData}
                            newPostText={state.profilePage.newPostText}
            />
        }
    }
    </StoreContext.Consumer>
};

export default MyPostsContainer;
