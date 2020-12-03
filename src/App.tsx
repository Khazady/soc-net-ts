import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {connect} from 'react-redux';
import {initializeAppTC} from "./redux/app-reducer";
import {RootStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";

type AppPropsType = {
    initialized: boolean
    initializingApp: () => void
}

class App extends React.Component<AppPropsType> {
    componentDidMount() {
        this.props.initializingApp()
    }

    render() {
        //В Profile /:userId параметр для пропсов withRouter (60 Выпуск)
        // ? после userId делает параметр опциональным, поэтому если в url его не будет, загрузится другой профиль(указан в коде компоненты)
        return !this.props.initialized
          ? <Preloader/>
          : (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Route exact path="/dialogs"
                           render={() => <DialogsContainer/>}/>
                    <Route path="/profile/:userId?"
                           render={() => <ProfileContainer/>}/>
                    <Route path="/users"
                           render={() => <UsersContainer/>}/>
                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/settings" component={Settings}/>

                    <Route path="/login" component={Login}/>
                </div>
            </div>
          );
    }
}

// connect redux
const mapStateToProps = (state: RootStateType) => ({
    initialized: state.app.initialized
})
const mapDispatchToProps = (dispatch: any) => ({
    initializingApp: () => dispatch(initializeAppTC())
})
export default connect(mapStateToProps, mapDispatchToProps)(App);