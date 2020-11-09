import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostTypes} from "../../../redux/profile-reducer";
import {AddPostFormRedux} from "./AddPostForm/AddPostForm";

type MyPostsPropsType = {
    postsData: Array<PostTypes>
    addPost: (newPostText: string) => void
};

const MyPosts: React.FC<MyPostsPropsType> = (props) => {
    let addNewPost = (values: any) => {
        props.addPost(values.newPostText)
    }
    let post = props.postsData.map(post =>
      <Post id={post.id}
            key={post.id}
            message={post.message}
            likesCount={post.likesCount}/>)
    return (
      <div className={classes.postsBlock}>
          <h3>My Posts</h3>
          <AddPostFormRedux onSubmit={addNewPost}/>
          <div className={classes.posts}>{post}</div>
      </div>
    );
};

export default MyPosts;
