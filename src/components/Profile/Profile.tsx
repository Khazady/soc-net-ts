import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsType, ProfilePageType} from "../../redux/store";

export type ProfilePropsType = {
  profilePage: ProfilePageType
  dispatch: (action: ActionsType) => void
};

const Profile = (props: ProfilePropsType) => {
  return (
    <div>
      <ProfileInfo />
      <MyPosts posts={props.profilePage.postsData}
               newPostText={props.profilePage.newPostText}
               dispatch={props.dispatch}/>
    </div>
  );
};

export default Profile;
