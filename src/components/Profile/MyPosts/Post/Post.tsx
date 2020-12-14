import classes from "../Post/Post.module.css";
import React from "react";
import { PostType } from "../../../../types/commonTypes";

type PropsType = PostType

const Post: React.FC<PropsType> = (props) => {
  return (
    <div key={props.id} className={classes.item}>
      <img src="https://i.ibb.co/0t8zmD0/pngwing-com.png" alt="avatar" />
      {props.message}
      <div>
        <span>{props.likesCount} likes</span>
      </div>
    </div>
  );
};
export default Post;
