import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {HashRouter, Route, withRouter} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {initializeAppTC} from "./redux/app-reducer";
import {RootStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import {withSuspense} from "./hoc/withSuspense";

//компонента не попадает в бандл(вебпак собирает все файлы в 1), она будет в своем бандле и только когда она не понадобится
//это ускоряет стартовую загрузку, но медленнее, когда перейдем к этой компоненте
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));


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
                           render={withSuspense(DialogsContainer)}/>
                    <Route path="/profile/:userId?"
                           render={withSuspense(ProfileContainer)}/>
                    <Route path="/users"
                           render={() => <UsersContainer/>}/>
                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/settings" component={Settings}/>

                    <Route path="/login" component={Login}/>
                </div>
            </div>
          )
          ;
    }
}

// connect redux
const mapStateToProps = (state: RootStateType) => ({
    initialized: state.app.initialized
})
const mapDispatchToProps = (dispatch: any) => ({
    initializingApp: () => dispatch(initializeAppTC())
})

let AppContainer: any = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps))(App)

//чтобы работали тесты App
export const MainApp = () => (
  <HashRouter>
      <Provider store={store}>
          <AppContainer/>
      </Provider>
  </HashRouter>
)