import {GetItemsType, instance, ApiResponseType} from './api'
import {UserType} from '../types/commonTypes'

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get<GetItemsType<Array<UserType>>>(`users?page=${currentPage}&count=${pageSize}`)
          //тут промис зен, чтобы в компоненту приходил ответ только с data
          .then(res => res.data)
    },
    //в get и delete настройки 2 параметр, в post 3-ий
    followUser(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`, {})
          .then(res => res.data)
    },
    unFollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
          .then(res => res.data) as Promise<ApiResponseType>
    }
}