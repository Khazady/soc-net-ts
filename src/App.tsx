import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route} from 'react-router-dom';
import {RootStateType} from "./redux/redux-store";
import { CombinedState } from 'redux';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/Users/UsersContainer';

type AppPropsTypes = {
    store: CombinedState<RootStateType>
}

const App: React.FC<any> = (props: AppPropsTypes) => {
    return (
      <div className='app-wrapper'>
          <Header/>
          <Navbar/>
          <div className="app-wrapper-content">
              <Route exact path="/dialogs"
                     render={() => <DialogsContainer /> } />
              <Route path="/profile"
                     render={() => <Profile /> } />
              <Route path="/users"
                     render={() => <UsersContainer /> } />
              <Route path="/news" component={News}/>
              <Route path="/music" component={Music}/>
              <Route path="/settings" component={Settings}/>
          </div>
      </div>
    );
}

export default App;