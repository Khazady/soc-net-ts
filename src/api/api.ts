import axios from "axios";
// это DAL

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
    }
};

export const followAPI = {
    //в get и delete настройки 2 параметр, в post 3-ий
    followUser(userId: string) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {})
          .then(response => response.data);
    },
    unFollowUser(userId: string) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`)
          .then(response => response.data);
    }
}

export const profileAPI = {
    getProfiles(userId: string) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
          .then(response => response.data)}
}