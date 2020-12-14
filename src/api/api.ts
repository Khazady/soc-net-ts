import axios from 'axios'

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": 'a13d3464-2e9e-4272-8cbf-d0d1a9048e02'
    }
})
//default values, so we may not specify when it's not necessary.
export type ApiResponseType<D = {}, RS = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RS
}
export type GetItemsType<T> = {
    items: T
    totalCount: number
    error: string | null
}


//only several requests may need captcha
export enum ResultCodes { Success = 0, Error = 1,}
export enum ResultCodeForCaptcha { CaptchaIsRequired = 10}

