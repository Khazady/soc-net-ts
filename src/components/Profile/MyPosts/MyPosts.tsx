import React from 'react';
import classes from "./MyPosts.module.css";
import Post, {PostTypes} from "./Post/Post";

type MyPostsPropsType = {
    posts: Array<PostTypes>
}

const MyPosts = (props: MyPostsPropsType) => {

    let post = props.posts.map(function (postElement) {
        return <Post message={postElement.message} likesCount={postElement.likesCount}/>})

    return (
      <div className={classes.postsBlock}>
          <h3>My Posts</h3>
          <div>
              <textarea>A</textarea>
              <button>Add post</button>
          </div>
          <div className={classes.posts}>
              {post}
          </div>
      </div>
    )
}

export default MyPosts;