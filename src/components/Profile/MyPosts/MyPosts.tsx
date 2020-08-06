import React, {ChangeEvent} from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { PostTypes } from "../../../redux/profile-reducer";

type MyPostsPropsType = {
    postsData: Array<PostTypes>
    newPostText: string
    updateNewPostText: (text: string) => void
    addPost: () => void
};

const MyPosts = (props: MyPostsPropsType) => {
    let post = props.postsData.map(function (postElement) {
        return (
          <Post id={postElement.id}
                key={postElement.id}
                message={postElement.message}
                likesCount={postElement.likesCount}/>
        );
    });

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewPostText(e.currentTarget.value)
    }

    return (
      <div className={classes.postsBlock}>
          <h3>My Posts</h3>
          <div>
              <textarea onChange={onPostChange} value={props.newPostText}/>
              <button onClick={onAddPost}>Add post</button>
          </div>
          <div className={classes.posts}>{post}</div>
      </div>
    );
};

export default MyPosts;
