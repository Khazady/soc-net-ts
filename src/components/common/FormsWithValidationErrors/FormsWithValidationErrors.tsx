import React, { FC } from "react"
import classes from "./FormsWithValidationErrors.module.css"
import {WrappedFieldProps} from "redux-form"

//rest оператор, деструктуризацией достаем инпут, мета, а остальное оставить в пропсы
export const Textarea: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    //если был в фокусе и не проходит валидатор.тс (в meta.error текст ошибки, либо null/undefined)
    const hasError = meta.touched && meta.error
    return <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
        <textarea {...input} {...props}/>
        {hasError && <span>{meta.error}</span>}
    </div>
}

export const Input: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    //если был в фокусе и не проходит валидатор.тс (в meta.error текст ошибки, либо null/undefined)
    const hasError = meta.touched && meta.error
    return <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
        <input {...input} {...props}/>
        {hasError && <span>{meta.error}</span>}
    </div>
}