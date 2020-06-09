import React from 'react';
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {PostTypes} from "./Post/Post";

const MyPosts = () => {
    let postsData: Array<PostTypes> = [
        {message: "Hi, how are you?", likesCount: 7},
        {message: "It's my first post", likesCount: 53},
        {message: "КУ", likesCount: 3},
    ]
    let post = postsData.map(function (postElement) {
        return <Post message={postElement.message} likesCount={postElement.likesCount}/>})

    return (
      <div className={classes.postsBlock}>
          <h3>My Posts</h3>
          <div>
              <textarea>A</textarea>
              <button>Add post</button>
          </div>
          <div className={classes.posts}>
              <Post message={postsData[0].message} likesCount={postsData[0].likesCount}/>
              {post}
          </div>
      </div>
    )
}

export default MyPosts;