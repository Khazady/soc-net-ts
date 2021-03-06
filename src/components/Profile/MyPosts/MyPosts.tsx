import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {AddPostFormRedux, AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import {PostType} from "../../../types/commonTypes";

export type MapStatePropsType = {
    postsData: Array<PostType>
}
export type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

const MyPost: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    let addNewPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }
    let post = [...props.postsData]
      //reverse мутабельный метод массива(не делает копию, а меняет изначальный массив по ссылке)
      //поэтому создаем копию
      .reverse()
      .map(post =>
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
    )
}

export const MyPostsMemorized = React.memo(MyPost);

