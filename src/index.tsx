import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {PostTypes} from "./components/Profile/MyPosts/Post/Post";
import {DialogItemType} from "./components/Dialogs/DialogItem/DialogsItem";
import {MessageType} from "./components/Dialogs/Message/Message";

//import * as serviceWorker from './serviceWorker';

let postsData: Array<PostTypes> = [
    {message: "Hi, how are you?", likesCount: 7},
    {message: "It's my first post", likesCount: 53},
    {message: "КУ", likesCount: 3},
]

let dialogsData: Array<DialogItemType> = [
    {id: 1, name: "Chris"},
    {id: 2, name: "Vicky"},
    {id: 3, name: "Mike"},
    {id: 4, name: "Alex"},
    {id: 5, name: "Ivan"},
]

let messagesData: Array<MessageType> = [
    {message: "Hello"},
    {message: "What's up"},
    {message: "ЗДАРОВА"},
    {message: "Yo"},
    {message: "Yo"},
]


ReactDOM.render(<App posts={postsData} dialogs={dialogsData} messages={messagesData} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
