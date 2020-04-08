import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// STORE
import store from "./redux/redux-store.js";

// Контекст
import {Provider} from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
);
