import React from 'react';
import classes from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import job from "../../../assets/images/lookingForAJob.jpg"
import noJob from "../../../assets/images/notLookingForAJob.jpg"
import ProfileStatus from "./ProfileStatus"

type ProfileInfoType = {
    profile: any
    status: string
    updateUserStatus: (status: string) => void
}

function ProfileInfo(props: ProfileInfoType) {
    //наш профиль в иниц стейте = null, поэтому когда он null рисуем колесо
    if (!props.profile) {
        return <Preloader/>
    }
    return (
      <div>
          {/*<div>
              <img
                src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
                alt="logo"/>
          </div>*/}
          <div className={classes.descriptionBlock}>
              <img src={props.profile.photos.large} alt={"no photo"}/>
              <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
              <span>{props.profile.aboutMe}</span>
          </div>
          <div>
              {props.profile.lookingForAJob ? <img src={job} alt={"alt"}/> : <img src={noJob} alt={"alt"}/>}
              <span>{props.profile.lookingForAJobDescription}</span>
          </div>
      </div>
    )
}

export default ProfileInfo;