import React, {ChangeEvent, useState} from 'react';
import classes from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import {ProfileStatus} from './ProfileStatus';
import userPhoto from "../../../assets/images/default-user-avatar.svg";
import {ProfileDataReduxForm} from "./ProfileDataForm";
import {profileServerType} from '../ProfileContainer';

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type ProfileFormDataType = {
    fullName: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    aboutMe: string | null
    contacts: ContactsType
}

type PropsType = {
    profile: profileServerType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    updatePhoto: (file: File | null | undefined) => void
    updateProfile: (profile: profileServerType) => Promise<any>
}

const ProfileInfo = ({profile, ...props}: PropsType) => {
    const [editMode, setEditMode] = useState(false);
    //наш профиль в иниц стейте = null, поэтому когда он null рисуем колесо
    if (!profile) {
        return <Preloader/>
    }
    //вызов санки когда выбираем фото
    const MainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files?.length) {
            const selectedFile = e.target.files?.item(0)
            props.updatePhoto(selectedFile)
        }
    }
    //сюда придет инфа по инпутам, собранная handleSubmit {aboutMe: 'что ввел', lookingFAJ: true} и тд
    const onSubmit = (formData: profileServerType) => {
        props.updateProfile(formData).then(() => setEditMode(false))
    }
    return (
      <div>
          <div className={classes.descriptionBlock}>
              <img src={profile.photos.large || userPhoto} className={classes.mainPhoto} alt={"something wrong"}/>
              <div>{props.isOwner ? <input type='file' onChange={MainPhotoSelected}/> : null}</div>
              <ProfileStatus status={props.status} updateUserStatus={props.updateStatus}/>
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
    profile: profileServerType
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
                        //мапимся по массиву ключей, в тайтле сам ключ, в валуе обращаемся через индекс obj["key"]
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