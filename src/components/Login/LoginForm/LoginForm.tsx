//типизация redux-form
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {Input} from "../../common/FormsWithValidationErrors/FormsWithValidationErrors";
//validator for Field from another file
import {required} from "../../../utils/validators";
import {LoginFormData} from "../Login";
import classes from "./../../common/FormsWithValidationErrors/FormsWithValidationErrors.module.css";
//деструктуризация пропсов, достаем из них нужные айтемы, чтобы постоянно не писать props.error
const LoginForm: React.FC<InjectedFormProps<LoginFormData, { captchaUrl: string }> & { captchaUrl: string }> = ({handleSubmit, error, captchaUrl}) => {
      //handleSubmit прокинул HOC, он делает e.preventDefault, передает значения из инпутов наверх упакуя в объект
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
//HOC, оборачиваем им форму
export const LoginReduxForm = reduxForm<LoginFormData, { captchaUrl: string }>({
    //имя для этой формы
    form: 'login'
})(LoginForm)