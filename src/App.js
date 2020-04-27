// React
import React from 'react';
import {BrowserRouter, Route, NavLink, Link, Switch} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';

// Компоненты
import Header from './components/header/header.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import ProfileBox from './components/profile/profile.jsx';
import ChatBox from './components/chat/chat.jsx';
import PeopleBox from './components/people/people.jsx';

// CSS
import './font/roboto.css';
import './css/main.css';

// Главная компонента
const App = (props) => {
    return (
        <BrowserRouter>
            <ScrollToTop>
                <div id="wrapper">
                    <Header/>
                    <Sidebar/>
                    <Route path='/profile/:id?' render={() => <ProfileBox/>} />
                    <Route path='/chat' render={() => <ChatBox/>}  />
                    <Route path='/users' render={() => <PeopleBox/>}  />
                </div>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;