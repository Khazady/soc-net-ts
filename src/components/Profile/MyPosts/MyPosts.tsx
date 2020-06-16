import React from "react";
import classes from "./MyPosts.module.css";
import { PostTypes } from "../../../redux/state";
import Post from "./Post/Post";

type MyPostsPropsType = {
  posts: Array<PostTypes>
  addPost: (postMessage: string) => void
};

const MyPosts = (props: MyPostsPropsType) => {
  let post = props.posts.map(function (postElement) {
    return (
      <Post id={postElement.id} message={postElement.message} likesCount={postElement.likesCount} />
    );
  });

  let newPostRef = React.createRef<HTMLTextAreaElement>();

  let addPost = () => {
      if(newPostRef.current) {
          props.addPost(newPostRef.current.value);
          /*обнуление строки после ввода*/
          newPostRef.current.value = "";
      }
  }

  return (
    <div className={classes.postsBlock}>
      <h3>My Posts</h3>
      <div>
        <textarea ref={newPostRef}>A</textarea>
        <button onClick={addPost}>Add post</button>
      </div>
      <div className={classes.posts}>{post}</div>
    </div>
  );
};

export default MyPosts;
