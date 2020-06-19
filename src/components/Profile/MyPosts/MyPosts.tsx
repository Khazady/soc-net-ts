import React, { ChangeEvent } from "react";
import classes from "./MyPosts.module.css";
import { PostTypes } from "../../../redux/state";
import Post from "./Post/Post";

type MyPostsPropsType = {
  posts: Array<PostTypes>
  newPostText: string
  addPost: () => void
  updateNewPostText: (newPostText: string) => void
};

const MyPosts = (props: MyPostsPropsType) => {
  let post = props.posts.map(function (postElement) {
    return (
      <Post id={postElement.id} message={postElement.message} likesCount={postElement.likesCount} />
    );
  });

  let addPost = () => {
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
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={classes.posts}>{post}</div>
    </div>
  );
};

export default MyPosts;
