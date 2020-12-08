import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsWithValidationErrors/FormsWithValidationErrors";
import {profileServerType} from "../ProfileContainer";
import classes from "../../common/FormsWithValidationErrors/FormsWithValidationErrors.module.css";

type ProfileDataFormPropsType = {
    profile: profileServerType
}

// fix types
const ProfileDataForm: React.FC<InjectedFormProps<profileServerType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = ({handleSubmit, error, profile}) => (
  <form onSubmit={handleSubmit}>
      <button>Save changes</button>
      {error && <div className={classes.formSummaryError}>{error}</div>}
      <ul>
          <li><b>Full name</b>: <Field placeholder="Full name" name='fullName' validate={[]} component={Input}/></li>
          <li><b>Looking for a job</b>: <Field component={Input} name="lookingForAJob" type="checkbox"/></li>
          <li><b>My skills</b>: <Field placeholder='My skills' name='lookingForAJobDescription' validate={[]}
                                       component={Textarea}/></li>
          <li><b>About Me</b>: <Field placeholder='About me' name='aboutMe' validate={[]} component={Textarea}/></li>
          <li>
              <b>Contacts</b>:
              <ul>
                  {Object.keys(profile.contacts).map(key => {
                      //мапимся по массиву ключей, в тайтле сам ключ, в валуе обращаемся через индекс obj["key"]
                      return <li key={key}><b>{key}: </b><Field placeholder={key} component={Input} name={'contacts.' + key}/></li>
                  })}
              </ul>
          </li>
      </ul>
  </form>
);

//HOC, оборачиваем им форму
export const ProfileDataReduxForm = reduxForm<profileServerType ,ProfileDataFormPropsType>(
  //имя для этой формы
  {form: 'edit-profile'}
)(ProfileDataForm)