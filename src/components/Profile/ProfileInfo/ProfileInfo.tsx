import React from 'react';
import classes from "./ProfileInfo.module.css";

type ProfileInfoType = {

}

function ProfileInfo(props: ProfileInfoType) {
    return (
      <div>
          <div>
              <img
                src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'
                alt="logo"/>
          </div>
          <div className={classes.descriptionBlock}>
              Ava + description
          </div>
      </div>
    )
}

export default ProfileInfo;