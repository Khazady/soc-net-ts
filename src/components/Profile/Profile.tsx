import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/commonTypes";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    updatePhoto: (photo: File) => void
    updateProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {
    return (
      <div>
          <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status}
                       updateStatus={props.updateStatus}
                       updatePhoto={props.updatePhoto} updateProfile={props.updateProfile}/>
          <MyPostsContainer/>
      </div>
    );
};

export default Profile;
