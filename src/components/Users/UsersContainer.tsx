import {connect} from "react-redux";
import Users from "./Users";
import {ActionsType, RootStateType} from "../../redux/redux-store";
import {followAC, setUsersAC, unfollowAC, UsersType} from "../../redux/users-reducer";

let mapStateToProps = (state: RootStateType) => {
    //принимает стейт целиком, а возвращает только то, что нужно компоненте
    return {
        users: state.usersPage.usersData
    }
}

let mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    //передает в пропсах презентационной компоненте коллбеки, которая она может вызывать
    return {
        follow: (userId: string) => {
            //диспатчит результат работы AC
            dispatch(followAC(userId))
        },
        unfollow: (userId: string) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: Array<UsersType>) => {
            dispatch(setUsersAC(users))
        }

    }
}


//коннектит контейнерную компоненту с UI-ной // комбайнит результаты обоих функций в один объект пропсов
export default connect(mapStateToProps, mapDispatchToProps)(Users)