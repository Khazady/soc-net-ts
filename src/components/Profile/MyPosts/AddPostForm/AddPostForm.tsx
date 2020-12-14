import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
//validator for Field from another file
import {maxLengthCreator, required} from "../../../../utils/validators";
import {Textarea} from "../../../common/FormsWithValidationErrors/FormsWithValidationErrors";

type PropsType = {}

//вызываем за компонентой, т.к. каждый раз приходит новая функция и зацикливается перерисовка(нет useCallback)
const maxLength10 = maxLengthCreator(10)

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component={Textarea} name='newPostText' placeholder="Type a new post" validate={[required, maxLength10]}/>
        <button>Add post</button>
    </form>
}

export type AddPostFormValuesType = {newPostText: string}

export const AddPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({
    form: "addPostForm"
})(AddPostForm)