import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {RootStateType} from "../../redux/redux-store";
import {connect} from "react-redux";
import {loginTC} from "../../redux/auth-reducer";
import {loginDataType} from "../../api/api";

//типизация redux-form
const LoginForm: React.FC<InjectedFormProps<loginDataType>> = (props) => (
  //handleSubmit прокинул HOC, он делает e.preventDefault, передает значения из инпутов наверх упакуя в объект
  <form onSubmit={props.handleSubmit}>
      <div><Field component="input" name="email" placeholder="Login"/></div>
      <div><Field component="input" name="password" placeholder="Password"/></div>
      <div><Field component="input" name="rememberMe" type="checkbox"/> remember me</div>
      <div>
          <button>Login</button>
      </div>
  </form>
)

//HOC, оборачиваем им форму
const LoginReduxForm = reduxForm<loginDataType>({
    //имя для этой формы
    form: 'login'
})(LoginForm)

const Login = (props: any) => {
    //сюда придет инфа по инпутам, собранная handleSubmit {login: 'что ввел', rememberMe: true} и тд
    const onSubmit = (formData: loginDataType) => {
        props.login({email: formData.email, password: formData.password, rememberMe: formData.rememberMe})
    }
    return <div>
        <h1>LOGIN</h1>
        <h2>{props.email}</h2>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

let mapStateToProps = (state: RootStateType) => ({form: state.form})
let mapDispatchToProps = (dispatch: any) => ({
    login: (loginData: loginDataType) => {
        dispatch(loginTC(loginData))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
