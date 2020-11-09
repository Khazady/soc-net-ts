import {Field, reduxForm} from "redux-form";
import React from "react";

const AddMessageForm: React.FC = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="textarea" name='newMessageText' placeholder="Type a message"/>
        <button>Send</button>
    </form>
}
export const AddMessageFormRedux = reduxForm(
  {form: "dialogAddMessageForm"}
)(AddMessageForm)