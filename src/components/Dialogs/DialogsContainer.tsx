import { addMessageActionCreator, updateNewMessageTextActionCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/redux-store";
import {ActionsType} from "../../redux/store";

let mapStateToProps = (state: RootStateType) => {
    return {
        dialogsPage: state.dialogsPage
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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs);
//2 объекта скрещиваются и превращаются в пропсы Dialogs
//connect использует subscribe (подписчик на изменение стейта)
//перерисует те компоненты, в кот. изменился стейт


export default DialogsContainer;