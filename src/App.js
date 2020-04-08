// React
import React from 'react';
import {BrowserRouter, Route, NavLink, Link, Switch} from 'react-router-dom';

// Компоненты
import Header from './components/header/header.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import ProfileBox from './components/profile/profile.jsx';
import ChatBox from './components/chat/chat.jsx';
import PeopleBox from './components/people/people.jsx';

// CSS
import './font/comfortaa.css';
import './css/main.css';

// Главная компонента
const App = (props) => {
    return (
        <BrowserRouter>
            <div id="wrapper">
                <Header/>
                <Sidebar/>
                <Route path='/profile' render={() => <ProfileBox store={props.store} />} />
                <Route path='/chat' render={() => <ChatBox store={props.store} />}  />
                <Route path='/users' render={() => <PeopleBox store={props.store} />}  />
            </div>
        </BrowserRouter>
    );
}

export default App;