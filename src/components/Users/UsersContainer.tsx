import {connect} from "react-redux";
import {Users} from "./Users";
import {ActionsType, RootStateType} from "../../redux/redux-store";
import {followAC, setUsersAC, unfollowAC, UsersType} from "../../redux/users-reducer";

let mapStateToProps = (state: RootStateType) => {
    return {
        usersPage: state.usersPage
    }
}

let mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        follow: (userId: string) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Users)