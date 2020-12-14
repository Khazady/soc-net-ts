import {addMessageAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import React from "react";


let mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        //приходит в стейт ссылка на новый объект(копия), тогда перерисовывает
    }
}

//конвеер(возьми Dialogs и оборачивай во всех хуки снизу вверх)
//возьми Dialogs, закинь в функцию withAuthRedirect, а результат этого вызова закинь в вызов connect как бы во вторую его скобку
//и так далее по конвееру
export default compose<React.ComponentType>(
  // HOC, который добавляет Redirect
  withAuthRedirect,
  connect(mapStateToProps, {addMessage: addMessageAC})
)(Dialogs);