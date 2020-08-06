import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';

// Thunk creator
import {initializeTC} from './redux/reducers/app';

// Компоненты
import Header from './components/header/header';
import ProfileBox from './components/profile/index';
import ChatBox from './components/chat';
import PeopleBox from './components/people/people';
import Footer from './components/footer/footer';
import Login from './components/login';
import Preloader from './components/spinners/pageSpinner';
import NotFound from './components/404/404';

// CSS
import './font/roboto.css';
import './css/bootstrap.min.css';
import './css/reset.css';
import './css/main.css';

// Главный компоненент
class App extends React.Component {

    // Обработка ошибок
    catchAllUnhandleErrors = (reason, promise) => {
        console.log('Some error!');
        console.log(reason, promise);
    }

    componentDidMount() {
        this.props.initializeTC();
        window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandleErrors);
    }

    render() {

        if(!this.props.initialize) {
            return <Preloader/>
        }

        return (
            <ScrollToTop>             
                <Header/>
                    <div className="container-xl">
                        <div className="row">
                            <div className="col-12">
                                <div id="content">
                                    <Switch>
                                        <Route exact path='/' render={() => <ProfileBox/>}/>
                                        <Route path='/users' render={() => <PeopleBox/>}/>
                                        <Route path='/profile/:id?' render={() => <ProfileBox/>}/>
                                        <Route path='/chat' render={() => <ChatBox/>}/>
                                        <Route path='/login' render={() => <Login/>}/>
                                        <Route path='*' render={() => <NotFound/>}/>
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer/>
            </ScrollToTop>
        );
    }
}

const mapStateToProps = (state) => ({
    initialize: state.app.initialize
});

export default compose(withRouter, connect(mapStateToProps, {initializeTC}))(App);