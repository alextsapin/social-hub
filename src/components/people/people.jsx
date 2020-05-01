import React from 'react';
import {NavLink} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import Pagination from '../pagination/pagination.jsx';
import Preloader from '../preloader/preloader.jsx';
import spinner from '../spinner/spinner.jsx';

// IMG
import stub from '../../images/stub.png';

// ACTION CREATORS
import { 
    FOLLOW_AC, 
    UNFOLLOW_AC, 
    SET_USERS_DATA_AC, 
    SET_CURRENT_PAGE_AC, 
    SET_USERS_COUNT_AC, 
    TOGGLE_IS_CONNECT_AC, 
    TOGGLE_FOLLOWING_AC,

    getUsersThunkCreator,
    pageChangeThunkCreator,
    followThunkCreator,
    unfollowThunkCreator
} from '../../redux/people-reducer.js';

let Person = (props) => {
    return (
        <div className="people__person">
            <div className="people__avatar">
                <ImageLoader className="people__image" src={props.image} wrapper={React.createFactory('div')} 
                    preloader={spinner}>
                </ImageLoader>
                <div>
                    {
                        props.followed
                        ? <button disabled={props.FOLLOW_ARRAY.some(id => id === props.id)} className="people__follow" 
                        onClick={()=> {props.unfollowThunkCreator(props.id);}}>UNFOLLOW</button>

                        : <button disabled={props.FOLLOW_ARRAY.some(id => id === props.id)} className="people__follow"
                        onClick={()=> {props.followThunkCreator(props.id)}}>FOLLOW</button>
                    }
                </div>
            </div>
            <div className="people__info">
                <NavLink className="people__name" to={'/profile/' + props.id}>
                    {props.name}
                </NavLink>
                <p className="people__status">{props.status}</p>
            </div>
        </div>
    )
}

let People = (props) => {

    return (
        <div className="container">
            {props.people.map(item => 
                <Person id                   = {item.id} 
                        followed             = {item.followed}
                        name                 = {item.name}
                        image                = {item.photos.small == null ? stub : item.photos.small}
                        status               = {item.status == null ? '.............' : item.status}
                        FOLLOW_ARRAY         = {props.FOLLOW_ARRAY }
                        TOGGLE_FOLLOWING_AC  = {props.TOGGLE_FOLLOWING_AC}

                        followThunkCreator   = {props.followThunkCreator}
                        unfollowThunkCreator = {props.unfollowThunkCreator}
                />
            )}

            <Pagination onPageChanged = {props.PAGE_CHANGED_PEOPLE_SERVER} 
                        currentPage   = {props.currentPage} 
                        size          = {props.pageSize} 
                        count         = {props.totalCount}
            />
        </div>
    )
}

// Презентацинная компонента Profile
class PeopleServer extends React.Component {

    componentDidMount() {   
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    PAGE_CHANGED_PEOPLE_SERVER = (page) => {
        this.props.pageChangeThunkCreator(page, this.props.pageSize)
    }

    render() {
        return ( 
            this.props.IS_CONNECT ? <Preloader/> :
            <People 
                totalCount                 = {this.props.totalCount} 
                pageSize                   = {this.props.pageSize}
                currentPage                = {this.props.currentPage}
                people                     = {this.props.people}
                FOLLOW_AC                  = {this.props.FOLLOW_AC}
                UNFOLLOW_AC                = {this.props.UNFOLLOW_AC }
                IS_CONNECT                 = {this.props.IS_CONNECT}
                PAGE_CHANGED_PEOPLE_SERVER = {this.PAGE_CHANGED_PEOPLE_SERVER}
                FOLLOW_ARRAY               = {this.props.FOLLOW_ARRAY}
                TOGGLE_FOLLOWING_AC        = {this.props.TOGGLE_FOLLOWING_AC}
                followThunkCreator         = {this.props.followThunkCreator}
                unfollowThunkCreator       = {this.props.unfollowThunkCreator}
            />
        );
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state) => {
    return {
        people:              state.people.USER_DATA,
        pageSize:            state.people.PAGE_SIZE,
        totalCount:          state.people.TOTAL_COUNT,
        currentPage:         state.people.CURRENT_PAGE,
        IS_CONNECT:          state.people.IS_CONNECT,
        FOLLOW_ARRAY:        state.people.FOLLOW_ARRAY
    }
}

const PeopleBox = connect(mapStateToProps, {
    FOLLOW_AC, 
    UNFOLLOW_AC, 
    SET_USERS_DATA_AC, 
    SET_CURRENT_PAGE_AC, 
    SET_USERS_COUNT_AC, 
    TOGGLE_IS_CONNECT_AC, 
    TOGGLE_FOLLOWING_AC,
    getUsersThunkCreator,
    pageChangeThunkCreator,
    followThunkCreator,
    unfollowThunkCreator
})(PeopleServer);

export default PeopleBox;