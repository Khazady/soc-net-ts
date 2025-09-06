import React, {ChangeEvent, useState} from 'react';
import classes from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from './ProfileStatus';
import userPhoto from "../../../assets/images/default-user-avatar.svg";
import {ProfileDataReduxForm} from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/commonTypes";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    updatePhoto: (photo: File) => void
    updateProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, ...props}) => {
    const [editMode, setEditMode] = useState(false);
    // Our profile in initial state is null, so when it's null we show the spinner
    if (!profile) {
        return <Preloader/>
    }
    // Call thunk when selecting a photo
    const MainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const selectedFile = e.target.files[0]
            props.updatePhoto(selectedFile)
        }
    }
    // handleSubmit collects input info here {aboutMe: 'value entered', lookingFAJ: true, etc.}
    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        props.updateProfile(formData).then(() => setEditMode(false))
    }
    return (
      <div>
          <div className={classes.descriptionBlock}>
              <img src={profile.photos.large || userPhoto} className={classes.mainPhoto} alt={"something wrong"}/>
              <div>{props.isOwner ? <input type='file' onChange={MainPhotoSelected}/> : null}</div>
              <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
          </div>
          {editMode
            ? <ProfileDataReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile}/>
            : <ProfileData profile={profile} isOwner={props.isOwner}
                           goToEditMode={() => setEditMode(true)}
            />}
      </div>
    )
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, ...props}) => {
    return <>
        {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}
        <ul>
            <li><b>Full name</b>: {profile.fullName}</li>
            <li><b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}</li>
            {profile.lookingForAJob && <li><b>My skills</b>: {profile.lookingForAJobDescription}</li>}
            <li><b>About Me</b>: {profile.aboutMe}</li>
            <li>
                <b>Contacts</b>:
                <ul>
                    {Object.keys(profile.contacts).map(key => {
                        // Iterate over array of keys: use key as title, value via index obj["key"]
                        return <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} key={key}/>
                    })}
                </ul>
            </li>
        </ul>
    </>
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
}
export const Contact: React.FC<ContactPropsType> = (props) => (
  <li><b>{props.contactTitle}</b>: {props.contactValue}</li>
)
export default ProfileInfo;