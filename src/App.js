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
import Footer from './components/footer/footer.jsx';
import Login from './components/login/login.jsx';

// CSS
import './font/roboto.css';
import './css/bootstrap.min.css';
import './css/reset.css';
import './css/main.css';

// Главный компоненент
const App = (props) => {
    return (
        <BrowserRouter>
            <ScrollToTop>             
                <Header/>
                <div className="container-fluid">
                    <div className="row">
                        <div id="sidebar" className="col-lg-3 col-md-4">
                            <Sidebar/>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div id="content">
                                <Route path='/profile/:id?' render={() => <ProfileBox/>}/>
                                <Route path='/chat'         render={() => <ChatBox/>}/>
                                <Route path='/users'        render={() => <PeopleBox/>}/>
                                <Route path='/login'        render={() => <Login/>}/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </ScrollToTop>
        </BrowserRouter>
    );
}

export default App;