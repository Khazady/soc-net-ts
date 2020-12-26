import React, {FC} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {HashRouter, Route, withRouter, Switch, Redirect} from 'react-router-dom';
import UsersContainer from './components/Users/UsersPage';
import {LoginPage} from './components/Login/LoginPage';
import {connect, Provider} from 'react-redux';
import {initializeAppTC} from "./redux/app-reducer";
import {RootStateType, store} from "./redux/store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import {withSuspense} from "./hoc/withSuspense";
import {Page404} from './components/common/Page404/Page404';
import { Header } from './components/Header/Header';

//компонента не попадает в бандл(вебпак собирает все файлы в 1), она будет в своем бандле и только когда она не понадобится
//это ускоряет стартовую загрузку, но медленнее, когда перейдем к этой компоненте
const DialogsPage = React.lazy(() => import("./components/Dialogs/Dialogs"))
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
//чтобы не оборачивать при каждой перерисовке?
const SuspendedDialogs = withSuspense(DialogsPage)
const SuspendedProfile = withSuspense(ProfileContainer)


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = { initializingApp: () => void }

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
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
        if (!this.props.isInitialized) {
            return <Preloader/>
        }
        //В Profile /:userId param for withRouter props (60)
        // ? after userId makes param optional, so if we haven't it in url, another profile will be uploaded(in component code)
        return (
          <div className='app-wrapper'>
              <Header/>
              <Navbar/>
              <div className="app-wrapper-content">
                  <Switch>
                      <Route exact path={'/'} render={() => <Redirect to={"/profile"}/>}/>
                      <Route path="/dialogs"
                             render={() => <SuspendedDialogs/>}/>
                      <Route path="/profile/:userId?"
                             render={() => <SuspendedProfile/>}/>
                      <Route path="/users"
                             render={() => <UsersContainer/>}/>
                      <Route path="/news" component={News}/>
                      <Route path="/music" component={Music}/>
                      <Route path="/settings" component={Settings}/>

                      <Route path="/login" component={LoginPage}/>
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
    isInitialized: state.app.isInitialized
})

let AppContainer = compose<React.ComponentType>(
  withRouter, //for taking URI-params
  connect(mapStateToProps, {initializingApp: initializeAppTC}))(App)

//made this component for correct work App.test
export const MainApp: FC = () => (
  //HashRouter for github pages
  <HashRouter>
      <Provider store={store}>
          <AppContainer/>
      </Provider>
  </HashRouter>
)