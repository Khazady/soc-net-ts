//common type
type FieldValidatorType = (value: string) => string | undefined

// If value is provided, return undefined; otherwise return a string
export const required: FieldValidatorType = (value) => value ? undefined : "Field is required"

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
Since we don't call the inner function, we can't pass maxLength as the second parameter along with value,
so we wrap it in a higher-order function and pass the parameter there
(CLOSURE - a function returns another function, and this inner function can use parameters (variables, etc.) of the outer function) */
export const maxLengthCreator = (maxLength: number): FieldValidatorType => {
    return (value) => value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined
}