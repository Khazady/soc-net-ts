import React from 'react';
import classes from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import job from "../../../assets/images/lookingForAJob.jpg"
import noJob from "../../../assets/images/notLookingForAJob.jpg"

type ProfileInfoType = {
    profile: any
}

function ProfileInfo(props: any) {
    //наш профиль в иниц стейте = null, поэтому когда он null рисуем колесо
    if (!props.profile) {
        return <Preloader/>
    }
    return (
      <div>
          <div>
              <img
                src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
                alt="logo"/>
          </div>
          <div className={classes.descriptionBlock}>
              <img src={props.profile.photos.large}/>
              <span>{props.profile.aboutMe}</span>
          </div>
          <div>
              {props.profile.lookingForAJob ? <img src={job}/> : <img src={noJob}/>}
              <span>{props.profile.lookingForAJobDescription}</span>
          </div>
      </div>
    )
}

export default ProfileInfo;