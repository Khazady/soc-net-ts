// Typing for redux-form
import {Field, InjectedFormProps, reduxForm} from "redux-form"
import React, { FC } from "react"
import {Input} from "../../common/FormsWithValidationErrors/FormsWithValidationErrors"
//validator for Field from another file
import {required} from "../../../utils/validators";
import {LoginFormValuesType} from "../LoginPage";
import classes from "./../../common/FormsWithValidationErrors/FormsWithValidationErrors.module.css";

type PropsType = { captchaUrl: string | null }

// Destructure props to extract needed items, avoiding repeated props.error
const LoginForm: FC<InjectedFormProps<LoginFormValuesType, PropsType> & PropsType> = ({handleSubmit, error, captchaUrl}) => {
      // handleSubmit was passed by HOC; it calls e.preventDefault and passes input values upward wrapped in an object
      return <form onSubmit={handleSubmit}>
          <div><Field component={Input} validate={[required]} name="email" placeholder="Email" type='email'/></div>
          <div><Field component={Input} validate={[required]} name="password" placeholder="Password" type='password'/>
          </div>
          <div><Field component={Input} name="rememberMe" type="checkbox"/> remember me</div>
          {captchaUrl && <img src={captchaUrl} alt='captcha'/>}
          {captchaUrl && <Field component={Input} placeholder='Enter symbols from image' name='captchaInput' validate={[required]} />}
          {error && <div className={classes.formSummaryError}>{error}</div>}
          <div>
              <button>Login</button>
          </div>
      </form>
  }

// HOC that wraps the form
export const LoginReduxForm = reduxForm<LoginFormValuesType, PropsType>({
    // Name for this form
    form: 'login'
})(LoginForm)