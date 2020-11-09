import React from "react";
import {reduxForm, Field} from "redux-form";
import {ActionsType, RootStateType} from "../../redux/redux-store";
import { connect } from "react-redux";


const LoginForm = (props: any) => (
  //handleSubmit прокинул HOC, он делает e.preventDefault, передает значения из инпутов наверх упакуя в объект
  <form onSubmit={props.handleSubmit}>
      <div><Field component="input" name="login" placeholder="Login"/></div>
      <div><Field component="input" name="password" placeholder="Password"/></div>
      <div><Field component="input" name="rememberMe" type="checkbox"/> remember me</div>
      <div>
          <button>Login</button>
      </div>
  </form>
)

//HOC, оборачиваем им форму
const LoginReduxForm = reduxForm({
    //имя для этой формы
    form: 'login'
})(LoginForm)

const Login = (props: any) => {
    //сюда придет инфа по инпутам, собранная handleSubmit {login: 'что ввел', rememberMe: true} и тд
    const onSubmit = (formData: any) => {
        //диспатчм в санку, надо законнектить компосом
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

let mapStateToProps = (state: RootStateType) => ({form: state.form})
let mapDispatchToProps = (dispatch: (action: ActionsType) => void) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Login);


// ThunkCreator

