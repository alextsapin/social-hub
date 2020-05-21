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
import {getPeople, 
        getPageSize, 
        getPeopleCount, 
        getCurrentPage,
        getIsConnect,
        getFollowUsers
} from '../../redux/selectors/people.js';

let Person = (props) => {
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
                                ? <button disabled={props.followUsers.some(id => id === props.id)} className="people__follow" 
                                onClick={()=> {props.unfollowTC(props.id);}}>UNFOLLOW</button>

                                : <button disabled={props.followUsers.some(id => id === props.id)} className="people__follow"
                                onClick={()=> {props.followTC(props.id)}}>FOLLOW</button>
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

let People = (props) => {
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

/* let mapStateToProps = (state) => {
    return {
        isAuth:         state.auth.isAuth,
        data:           state.people.data,
        size:           state.people.size,
        count:          state.people.count,
        currentPage:    state.people.currentPage,
        isConnect:      state.people.isConnect,
        followUsers:    state.people.followUsers
    }
} */

let mapStateToProps = (state) => {
    return {
        data:           getPeople(state),
        size:           getPageSize(state),
        count:          getPeopleCount(state),
        currentPage:    getCurrentPage(state),
        isConnect:      getIsConnect(state),
        followUsers:    getFollowUsers(state),
        //followUsers:    state.people.followUsers


        isAuth:         state.auth.isAuth,
        
        
        
    }
}



export default compose(connect(mapStateToProps, {getUsersTC, pageChangeTC, followTC, unfollowTC}))(PeopleServer);