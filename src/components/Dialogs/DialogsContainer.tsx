import {addMessageAC} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {ActionsType, RootStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirectHOC";
import {compose} from "redux";


let mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        //приходит в стейт ссылка на новый объект(копия), тогда перерисовывает
    }
} //возвращает состояние объектом
let mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        sendMessage: (newMessageText: string) => {
            //диспатчим, то, что вернул экшн креатор
            dispatch(addMessageAC(newMessageText))
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
)(Dialogs);