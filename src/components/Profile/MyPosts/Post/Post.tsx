import classes from "../Post/Post.module.css";
import React from "react";
import { PostTypes } from "../../../../redux/state";

const Post = (props: PostTypes) => {
  return (
    <div key={props.id} className={classes.item}>
      <img src="https://i.ibb.co/   0t8zmD0/pngwing-com.png" alt="avatar" />
      {props.message}
      <div>
        <span>{props.likesCount} likes</span>
      </div>
    </div>
  );
};
export default Post;
