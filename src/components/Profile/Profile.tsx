import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

export type ProfilePropsType = {
  state: ProfilePageType;
  addPost: (postMessage: string) => void
};

const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.state.postsData} addPost={props.addPost} />
    </div>
  );
};

export default Profile;
