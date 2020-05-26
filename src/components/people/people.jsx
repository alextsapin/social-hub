import React from 'react';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import Pagination from '../pagination/pagination.jsx';
import Preloader from '../preloader/preloader.jsx';
import spinner from '../spinner/spinner.jsx';

// IMG
import stub from '../../images/stub.png';

// Thunk creators
import {getUsersTC, pageChangeTC, followTC, unfollowTC} from '../../redux/reducers/people.js';

// Selectors
import {peopleSelector, 
        pageSizeSelector, 
        peopleCountSelector, 
        currentPageSelector,
        isConnectSelector,
        followUsersSelector
} from '../../redux/selectors/people.js';

const Person = (props) => {
    return (
        <div className="people__person">
            <div className="row">
                <div className="col-md-4">
                    <div className="people__avatar">
                        <NavLink to={'/profile/' + props.id}>
                            <ImageLoader className="people__image" src={props.image} wrapper={React.createFactory('div')} 
                                preloader={spinner}>
                            </ImageLoader>
                        </NavLink>
                        <div>
                            {
                                props.followed
                                ? <button disabled={props.followUsers.some(id => id === props.id)} className="btn btn-secondary" 
                                onClick={()=> {props.unfollowTC(props.id);}}>
                                    <svg className="mr-2 mb-1 bi bi-person-plus-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                        <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
                                    </svg>
                                    <span>UNFOLLOW</span>
                                  </button>

                                : <button disabled={props.followUsers.some(id => id === props.id)} className="btn btn-secondary"
                                onClick={()=> {props.followTC(props.id)}}>
                                    <svg className="mr-2 mb-1 bi bi-person-plus-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                        <path fill-rule="evenodd" d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
                                    </svg>
                                    <span>FOLLOW</span>
                                  </button>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="people__info">
                        <NavLink className="people__name" to={'/profile/' + props.id}>{props.name}</NavLink>
                        <p className="people__status">{props.status}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const People = (props) => {
    return (
        <div className="mt-5 mb-5">
            {props.data.map(item => 
                <Person 
                    key            = {item.id}
                    id             = {item.id} 
                    followed       = {item.followed}
                    name           = {item.name}
                    image          = {item.photos.small == null ? stub : item.photos.small}
                    status         = {item.status == null ? '.............' : item.status}
                    followUsers    = {props.followUsers}
                    followTC       = {props.followTC}
                    unfollowTC     = {props.unfollowTC}
                />
            )}

            <Pagination 
                onPageChanged = {props.onPageChanged} 
                currentPage   = {props.currentPage} 
                size          = {props.size} 
                count         = {props.count}
            />
        </div>
    )
}

// Презентацинная компонента Profile
class PeopleServer extends React.Component {

    componentDidMount() {   
        this.props.getUsersTC(this.props.currentPage, this.props.size);
    }

    onPageChanged = (page) => {
        this.props.pageChangeTC(page, this.props.size)
    }

    render() {
        return ( 
            this.props.isConnect ? <Preloader/> :
            <People 
                data             = {this.props.data}
                count            = {this.props.count} 
                size             = {this.props.size}
                currentPage      = {this.props.currentPage}
                isConnect        = {this.props.isConnect}
                onPageChanged    = {this.onPageChanged}
                followUsers      = {this.props.followUsers}
                followTC         = {this.props.followTC}
                unfollowTC       = {this.props.unfollowTC}
            />
        );
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state) => {
    return {
        data:           peopleSelector(state),
        size:           pageSizeSelector(state),
        count:          peopleCountSelector(state),
        currentPage:    currentPageSelector(state),
        isConnect:      isConnectSelector(state),
        followUsers:    followUsersSelector(state),
        isAuth:         state.auth.isAuth,
    }
}

export default compose(connect(mapStateToProps, {getUsersTC, pageChangeTC, followTC, unfollowTC}))(PeopleServer);