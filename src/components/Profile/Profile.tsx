import React from 'react';
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostTypes} from "./MyPosts/Post/Post";

type ProfilePropsType = {
    posts: Array<PostTypes>
}

const Profile = (props: ProfilePropsType) => {
    return (
      <div>
          <ProfileInfo/>
          <MyPosts posts={props.posts}/>
      </div>
    )
}

export default Profile;