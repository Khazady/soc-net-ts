import React from 'react'
import {Field, Form, Formik} from 'formik'
import {FilterType} from '../../redux/users-reducer'

type PropsType = {
    onFilterChanger: (filter: FilterType) => void
}

const formValidation = (values: any) => {
    const errors = {}
    return errors
}
export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const submit = (values: FilterType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        debugger
        props.onFilterChanger(values)
        setSubmitting(false)
    }
    return <Formik
        initialValues={{searchInput: '', friend: null}}
        validate={formValidation}
        onSubmit={submit}
    >
        {({isSubmitting}) => (
            <Form>
                <Field type="text" name="searchInput"/>
                <Field name="friend" as="select">
                    <option value="null">All</option>
                    <option value="true">Friends</option>
                    <option value="false">Unfollowed</option>
                </Field>
                <button type="submit" disabled={isSubmitting}>
                    Search
                </button>
            </Form>
        )}
    </Formik>
})