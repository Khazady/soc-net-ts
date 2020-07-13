import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route} from 'react-router-dom';
import {RootStateType} from "./redux/state";

type AppPropsTypes = {
    state: RootStateType
    dispatch: any
}

const App = (props: AppPropsTypes) => {
    return (
      <div className='app-wrapper'>
          <Header/>
          <Navbar/>
          <div className="app-wrapper-content">
              <Route exact path="/dialogs"
                     render={() => <Dialogs dialogsPage={props.state.dialogsPage}
                                            newMessageText={props.state.dialogsPage.newMessageText}
                                            dispatch={props.dispatch} />}/>
              <Route path="/profile"
                     render={() => <Profile profilePage={props.state.profilePage}
                                            dispatch={props.dispatch}/>}
              />
              <Route path="/news" component={News}/>
              <Route path="/music" component={Music}/>
              <Route path="/settings" component={Settings}/>
          </div>
      </div>
    );
}

export default App;