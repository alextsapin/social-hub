import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';

// Thunk creator
import {initializeTC} from './redux/reducers/app';

// Компоненты
import Header from './components/header/header';
import ProfileBox from './components/profile/index';
import ChatBox from './components/chat/index';
import PeopleBox from './components/people/index';
import Footer from './components/footer/footer';
import Login from './components/login';
import Preloader from './components/spinners/pageSpinner';
import NotFound from './components/404/404';

// CSS
import './font/OpenSans.css';
import './css/bootstrap.min.css';
import './css/reset.css';
import './css/main.css';

// Types
import {AppStateType} from './redux/store';

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    initializeTC: () => void
}

// Главный компоненент
class App extends React.Component<MapPropsType & DispatchPropsType> {

    // Обработка ошибок
    catchAllUnhandleErrors = (e: PromiseRejectionEvent) => {
        console.log('Some error!');
        console.log(e.reason, e.promise);
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
            <div>             
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
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialize: state.app.initialize
});

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, {initializeTC}))(App);