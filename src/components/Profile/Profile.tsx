import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type ProfilePropsType = {
    profile: any
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File | null | undefined) => void
}

const Profile = (props: ProfilePropsType) => {
    return (
      <div>
          <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                       updateUserStatus={props.updateUserStatus}
                       savePhoto={props.savePhoto}/>
          <MyPostsContainer/>
      </div>
    );
};

export default Profile;
