import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Route} from 'react-router-dom';
import {PostTypes} from "./components/Profile/MyPosts/Post/Post";
import {DialogItemType} from "./components/Dialogs/DialogItem/DialogsItem";
import {MessageType} from "./components/Dialogs/Message/Message";

type AppPropsTypes = {
  posts: Array<PostTypes>,
  dialogs: Array<DialogItemType>,
  messages: Array<MessageType>
}

const App = (props: AppPropsTypes) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header/>
        <Navbar/>
        <div className="app-wrapper-content">
          <Route exact path="/dialogs" render={ () => <Dialogs dialogs={props.dialogs} messages={props.messages}/> }/>
          <Route path="/profile" render={ () => <Profile posts={props.posts}/> }/>
          <Route path="/news" component={News}/>
          <Route path="/music" component={Music}/>
          <Route path="/settings" component={Settings}/>
        </div>
      </div>
    </BrowserRouter>);
}

export default App;