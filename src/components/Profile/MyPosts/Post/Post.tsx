import classes from "../Post/Post.module.css";
import React from "react";

type PostTypes = {
  message: string,
  likesCount: number
}

const Post = (props:PostTypes) => {

    return (
        <div className={classes.item}>
            <img src= "https://i.ibb.co/0t8zmD0/pngwing-com.png" alt="avatar"/>
            {props.message}
            <div><span>{props.likesCount} likes</span></div>
        </div>
    )
}
export default Post;