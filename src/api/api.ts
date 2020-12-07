import axios from "axios";
// это DAL
//api pass samurai1809

//для избежания дублирования кода в каждом запросе
//baseURL вставляется перед каждой строкой
//настройки withCredentials и headers добавляются автоматически
const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        "API-KEY": "a13d3464-2e9e-4272-8cbf-d0d1a9048e02"
    }
});

//для удобства разные ветки обращений сортируем по объектам
export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        //при get-запросе мы можем отправить на сервер только этот адрес
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
          //тут промис зен, чтобы в компоненту приходил ответ только с data
          .then(response => response.data)
    },
    //в get и delete настройки 2 параметр, в post 3-ий
    followUser(userId: string) {
        return instance.post(`follow/${userId}`, {})
          .then(response => response.data);
    },
    unFollowUser(userId: string) {
        return instance.delete(`follow/${userId}`)
          .then(response => response.data);
    }
};

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/${userId}`)
          .then(response => response.data)},
    getUserStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
          .then(response => response.data)},
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
          .then(response => response.data)},
    uploadPhoto(photoFile: any) {
        debugger
        //формируем объект с файлом
        let formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            //меня тип отправляемых данных с json на формдату
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
          .then(response => response.data)
    }
}


export const authAPI = {
    me() {
        return instance.get(`auth/me`).then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe}).then(res => res.data)
    },
    logout() {
        return instance.delete('auth/login').then(response => response.data)
    }
}