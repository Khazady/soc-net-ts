import {Field, InjectedFormProps, reduxForm} from "redux-form";
import React, {FC} from "react";
import {Textarea} from "../../common/FormsWithValidationErrors/FormsWithValidationErrors";
import {maxLengthCreator, required} from "../../../utils/validators";

//вызываем за компонентой, т.к. каждый раз приходит новая функция и зацикливается перерисовка(нет useCallback)
const maxLength100 = maxLengthCreator(100)

type NewMessageFormType = { newMessageText: string }
type PropsType = {}

const AddMessageForm: FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name='newMessageText' placeholder="Type a message"
               validate={[required, maxLength100]}/>
        <button>Send</button>
    </form>
}
export const AddMessageFormRedux = reduxForm<NewMessageFormType & PropsType>(
  {form: "dialogAddMessageForm"}
)(AddMessageForm)