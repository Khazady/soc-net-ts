import {addPostAC, updateNewPostTextAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootStateType, ActionsType} from "../../../redux/redux-store";


let mapStateToProps = (state: RootStateType) => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
        //перерисуйся, когда что-то из этого изменится
    }
}
let mapDispatchToProps = (dispatch: (action: ActionsType) => void) => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        updateNewPostText: (text: string) => {
            let action = updateNewPostTextAC(text)
            dispatch(action)
        }
    }
}
const MyPostContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostContainer;
