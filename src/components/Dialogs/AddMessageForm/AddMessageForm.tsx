import {Field, reduxForm} from "redux-form";
import React from "react";
//validator for Field from another file
import {Textarea} from "../../common/FormsWithValidationErrors/FormsWithValidationErrors";

import {maxLengthCreator, required} from "../../../utils/validators";

//вызываем за компонентой, т.к. каждый раз приходит новая функция и зацикливается перерисовка(нет useCallback)
const maxLength100 = maxLengthCreator(100)

const AddMessageForm: React.FC = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name='newMessageText' placeholder="Type a message" validate={[required, maxLength100]}/>
        <button>Send</button>
    </form>
}
export const AddMessageFormRedux = reduxForm(
  {form: "dialogAddMessageForm"}
)(AddMessageForm)