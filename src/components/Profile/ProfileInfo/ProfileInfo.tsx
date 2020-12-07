import React, {ChangeEvent} from 'react';
import classes from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from './ProfileStatus';
import userPhoto from "../../../assets/images/default-user-avatar.svg";

type ProfileInfoType = {
    profile: any
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photo: File | null | undefined) => void
}

const ProfileInfo = (props: ProfileInfoType) => {
    //наш профиль в иниц стейте = null, поэтому когда он null рисуем колесо
    if (!props.profile) {
        return <Preloader/>
    }

    const MainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            const selectedFile = e.target.files?.item(0)
            props.savePhoto(selectedFile)
        }
    }
    return (
      <div>
          <div className={classes.descriptionBlock}>
              <img src={props.profile.photos.large || userPhoto} className={classes.mainPhoto} alt={"something wrong"}/>
              {props.isOwner ? <input type='file' onChange={MainPhotoSelected}/> : null}
              <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
              <span>{props.profile.aboutMe}</span>
          </div>
          <div>
              {props.profile.lookingForAJob
                ? <p style={{padding: "10px"}}>Open to work</p>
                : <p style={{padding: "10px"}}>Not interested in work</p>}
              <span>{props.profile.lookingForAJobDescription}</span>
          </div>
      </div>
    )
};

export default ProfileInfo;