import {PhotosType, ProfileType} from '../types/commonTypes'
import {instance, ApiResponseType} from './api'

type UploadPhotosDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`)
          .then(res => res.data)
    },
    getUserStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
          .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status`, {status})
          .then(res => res.data)
    },
    uploadPhoto(photoFile: File) {
        // Create an object with the file
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put<ApiResponseType<UploadPhotosDataType>>(`profile/photo`, formData, {
            // Change the type of sent data from JSON to FormData
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
          .then(response => response.data)
    },
    updateProfile(changedProfile: ProfileType) {
        return instance.put<ApiResponseType>(`profile`, changedProfile)
          .then(res => res.data)
    },
}