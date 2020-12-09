import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {HashRouter, Route, withRouter, Switch, Redirect} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from './components/Login/Login';
import {connect, Provider} from 'react-redux';
import {initializeAppTC} from "./redux/app-reducer";
import {RootStateType, store} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import {withSuspense} from "./hoc/withSuspense";
import { Page404 } from './components/common/Page404/Page404';

//компонента не попадает в бандл(вебпак собирает все файлы в 1), она будет в своем бандле и только когда она не понадобится
//это ускоряет стартовую загрузку, но медленнее, когда перейдем к этой компоненте
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));


type AppPropsType = {
    initialized: boolean
    initializingApp: () => void
}

class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
        //server errors/offline
        alert("Some error occurred")
    }
    componentDidMount() {
        this.props.initializingApp()
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }
    // clear junk before comp dies
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
    }

    render() {
        //we see preloader before compDidMount works
        if (!this.props.initialized) {
            return <Preloader/>
        }
        //В Profile /:userId param for withRouter props (60)
        // ? after userId makes param optional, so if we haven't it in url, another profile will be uploaded(in component code)
        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Switch>
                        <Route exact path={'/'} render={withSuspense(ProfileContainer)}/>
                        <Route path="/dialogs"
                                   render={withSuspense(DialogsContainer)}/>
                        <Route path="/profile/:userId?"
                               render={withSuspense(ProfileContainer)}/>
                        <Route path="/users"
                               render={() => <UsersContainer/>}/>
                        <Route path="/news" component={News}/>
                        <Route path="/music" component={Music}/>
                        <Route path="/settings" component={Settings}/>

                        <Route path="/login" component={Login}/>
                        <Route path={'/404'} render={() => <Page404/>}/>
                        <Redirect from={'*'} to={'/404'}/>
                    </Switch>
                </div>
            </div>
          )
          ;
    }
}


const mapStateToProps = (state: RootStateType) => ({
    initialized: state.app.initialized
})
const mapDispatchToProps = (dispatch: any) => ({
    initializingApp: () => dispatch(initializeAppTC())
})

let AppContainer: any = compose(
  withRouter, //for taking URI-params
  connect(mapStateToProps, mapDispatchToProps))(App)

//made this component for correct work App.test
export const MainApp = () => (
  //HashRouter for github pages
  <HashRouter>
      <Provider store={store}>
          <AppContainer/>
      </Provider>
  </HashRouter>
)