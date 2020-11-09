import React from "react";
import {Field, reduxForm} from "redux-form";

const AddPostForm: React.FC = (props: any) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component='textarea' name='newPostText' placeholder="Type a new post"/>
        <button>Add post</button>
    </form>
}

export const AddPostFormRedux = reduxForm({
    form: "addPostForm"
})(AddPostForm)