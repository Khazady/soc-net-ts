import './index.css';
import {store} from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {RootStateType} from "./redux/store";


let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(<BrowserRouter>
        <App
          state={store.getState()} /*вызываем прямо здесь геттер, чтобы получить стейт сюда сейчас*/
          dispatch={store.dispatch.bind(store)} //bind лочит контекст на store, создает копию функции, в которой this всегда store
        />
    </BrowserRouter>, document.getElementById('root'));
}

rerenderEntireTree(store.getState()); //не нужен bind, т.к. getState вызываем прямо здесь

store.subscribe(() => {
    let state = store.getState();
    rerenderEntireTree(state);
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
