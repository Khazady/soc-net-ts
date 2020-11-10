//типизация redux-form
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {loginDataType} from "../../../api/api";
import React from "react";
import {Input} from "../../common/FormsWithValidationErrors/FormsWithValidationErrors";
//validator for Field from another file
import {required} from "../../../utils/validators";

const LoginForm: React.FC<InjectedFormProps<loginDataType>> = (props) => (
  //handleSubmit прокинул HOC, он делает e.preventDefault, передает значения из инпутов наверх упакуя в объект
  <form onSubmit={props.handleSubmit}>
      <div><Field component={Input} validate={[required]} name="email" placeholder="Login"/></div>
      <div><Field component={Input} validate={[required]} name="password" placeholder="Password"/></div>
      <div><Field component={Input} name="rememberMe" type="checkbox"/> remember me</div>
      <div>
          <button>Login</button>
      </div>
  </form>
)
//HOC, оборачиваем им форму
export const LoginReduxForm = reduxForm<loginDataType>({
    //имя для этой формы
    form: 'login'
})(LoginForm)