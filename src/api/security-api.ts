import {instance} from './api'

type GetCaptchaUrl = {url: string}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrl>(`security/get-captcha-url`).then(res => res.data)
    }
}