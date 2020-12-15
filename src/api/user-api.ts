import {GetItemsType, instance, ApiResponseType} from './api'
import {UserType} from '../types/commonTypes'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, searchInput = '', friend: null | boolean = null) {
        return instance.get<GetItemsType<Array<UserType>>>(`users?page=${currentPage}&count=${pageSize}&term=${searchInput}` + (friend === null ? '' : `&friend=${friend}`))
          //тут промис зен, чтобы в компоненту приходил ответ только с data
          .then(res => res.data)
    },
    //в get и delete настройки 2 параметр, в post 3-ий
    followUser(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`, {})
          .then(res => res.data)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
          .then(res => res.data) as Promise<ApiResponseType>
    }
}