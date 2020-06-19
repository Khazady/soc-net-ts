import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ProfilePageType} from "../../redux/state";

export type ProfilePropsType = {
  profilePage: ProfilePageType
  addPost: () => void
  updateNewPostText: (newPostText: string) => void
};

const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.profilePage.postsData}
               newPostText={props.profilePage.newPostText}
               addPost={props.addPost}
               updateNewPostText={props.updateNewPostText}/>
    </div>
  );
};

export default Profile;
