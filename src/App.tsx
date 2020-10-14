import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {Route} from 'react-router-dom';
import {RootStateType} from "./redux/redux-store";
import { CombinedState } from 'redux';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App: React.FC<any> = () => {
    //В Profile /:userId параметр для пропсов withRouter (60 Выпуск)
    // ? после userId делает параметр опциональным, поэтому если в url его не будет, загрузится другой профиль(указан в коде компоненты)
    return (
      <div className='app-wrapper'>
          <HeaderContainer/>
          <Navbar/>
          <div className="app-wrapper-content">
              <Route exact path="/dialogs"
                     render={() => <DialogsContainer /> } />
              <Route path="/profile/:userId?"
                     render={() => <ProfileContainer /> } />
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