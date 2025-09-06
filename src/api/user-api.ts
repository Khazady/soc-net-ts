import {GetItemsType, instance, ApiResponseType} from './api'
import {UserType} from '../types/commonTypes'

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, searchInput = '', friend: null | boolean = null) {
        return instance.get<GetItemsType<Array<UserType>>>(`users?page=${currentPage}&count=${pageSize}&term=${searchInput}` + (friend === null ? '' : `&friend=${friend}`))
          // Promise then here so the component receives only res.data
          .then(res => res.data)
    },
    // In get and delete configs are the second parameter; in post they are the third
    followUser(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`, {})
          .then(res => res.data)
    },
    unfollowUser(userId: number) {
        return instance.delete(`follow/${userId}`)
          .then(res => res.data) as Promise<ApiResponseType>
    }
}