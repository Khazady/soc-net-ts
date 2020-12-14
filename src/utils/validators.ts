//common type
type FieldValidatorType = (value: string) => string | undefined

//если пришло value, то undefined, else string
export const required: FieldValidatorType = (value) => value ? undefined : "Field is required"

/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
т.к. не мы вызываем внутреннюю функцию, передать в неё помимо value maxLength вторым параметром нельзя, поэтому
оборачиваем в функцию обертку и передаем в неё параметр
(ЗАМЫКАНИЕ - фун возвр другую фун и эта внутренняя фун может юзать параметры(переменные и т.д.) внешней функции) */
export const maxLengthCreator = (maxLength: number): FieldValidatorType => {
    return (value) => value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined
}