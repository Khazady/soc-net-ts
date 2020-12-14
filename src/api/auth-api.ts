import {instance, ApiResponseType, ResultCodeForCaptcha, ResultCodes} from "./api";

type MeResponseDataType = {id: number, email: string, login: string}

export const authAPI = {
    me() {
        return instance.get<ApiResponseType<MeResponseDataType>>(`auth/me`).then((res) => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ApiResponseType<{userId: number}, ResultCodes | ResultCodeForCaptcha>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login').then(res => res.data)
    }
}