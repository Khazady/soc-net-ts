import './index.css';
import { rerenderEntireTree } from './render';
import state from "./redux/state";

//import * as serviceWorker from './serviceWorker';


rerenderEntireTree(state);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
