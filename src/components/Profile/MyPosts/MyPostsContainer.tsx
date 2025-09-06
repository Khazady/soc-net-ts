import {addPostAC} from "../../../redux/profile-reducer";
import {MyPostsMemorized, MapStatePropsType, MapDispatchPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {RootStateType} from "../../../redux/store";


let mapStateToProps = (state: RootStateType) => {
    return {
        postsData: state.profilePage.postsData,
        // Re-render when any of this changes
    }
}
export default connect<MapStatePropsType, MapDispatchPropsType, {}, RootStateType>(mapStateToProps, {addPost: addPostAC}) (MyPostsMemorized);

