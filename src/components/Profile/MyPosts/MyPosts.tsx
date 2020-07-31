import React, {ChangeEvent} from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profile-reducer";
import { PostTypes } from "../../../redux/store";

type MyPostsPropsType = {
    posts: Array<PostTypes>
    newPostText: string
    dispatch: any
};

const MyPosts = (props: MyPostsPropsType) => {
    let post = props.posts.map(function (postElement) {
        return (
          <Post id={postElement.id} message={postElement.message} likesCount={postElement.likesCount}/>
        );
    });

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let action = updateNewPostTextActionCreator(e.currentTarget.value)
        props.dispatch(action)
    }

    return (
      <div className={classes.postsBlock}>
          <h3>My Posts</h3>
          <div>
              <textarea onChange={onPostChange} value={props.newPostText}/>
              <button onClick={addPost}>Add post</button>
          </div>
          <div className={classes.posts}>{post}</div>
      </div>
    );
};

export default MyPosts;
