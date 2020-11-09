import {addMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs, {DialogsPropsType} from "./Dialogs";
import {connect} from "react-redux";
import {ActionsType, RootStateType} from "../../redux/redux-store";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHOC";
import {compose} from "redux";

class DialogsContainer extends React.Component<DialogsPropsType, any> {
    render() {
        return <Dialogs {...this.props}/>
        }
}

let mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        //приходит в стейт ссылка на новый объект(копия), тогда перерисовывает
    }
} //возвращает состояние объектом
let mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        sendMessage: () => {
            //диспатчим, то, что вернул экшн креатор
            dispatch(addMessageActionCreator())
        },
        updateNewMessageBody: (body: string) => {
            let action = updateNewMessageTextActionCreator(body)
            dispatch(action)
        }
    }
} //возвращает коллбеки объектом


//конвеер(возьми Dialogs и оборачивай во всех хуки снизу вверх)
//возьми Dialogs, закинь в функцию withAuthRedirect, а результат этого вызова закинь в вызов connect как бы во вторую его скобку
//и так далее по конвееру
export default compose(
  // HOC, который добавляет Redirect
  withAuthRedirect,
  connect(mapStateToProps, mapDispatchToProps)
)(DialogsContainer);