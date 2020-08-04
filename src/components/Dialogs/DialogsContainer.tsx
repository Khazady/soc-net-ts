import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {ActionsType} from "../../redux/store";

let mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogsPage
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);
//2 объекта скрещиваются и превращаются в пропсы Dialogs


export default DialogsContainer;