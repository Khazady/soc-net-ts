import React, { FC } from "react"
import classes from "./FormsWithValidationErrors.module.css"
import {WrappedFieldProps} from "redux-form"

// Rest operator: destructure input and meta, keep the rest in props
export const Textarea: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    // If it was focused and fails validators.ts (meta.error contains error text or null/undefined)
    const hasError = meta.touched && meta.error
    return <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
        <textarea {...input} {...props}/>
        {hasError && <span>{meta.error}</span>}
    </div>
}

export const Input: FC<WrappedFieldProps> = ({input, meta, ...props}) => {
    // If it was focused and fails validators.ts (meta.error contains error text or null/undefined)
    const hasError = meta.touched && meta.error
    return <div className={classes.formControl + " " + (hasError ? classes.error : "")}>
        <input {...input} {...props}/>
        {hasError && <span>{meta.error}</span>}
    </div>
}