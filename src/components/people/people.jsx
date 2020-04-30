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
    TOGGLE_FOLLOWING_AC
} from '../../redux/people-reducer.js';

// DAL
import {
    PEOPLE_API, 
    FOLLOW_API, 
    UNFOLLOW_API
} from '../../api/api.js';

let People = (props) => {

    return (
        <div className="container">
            {props.people.map(item => 
                <div className="people__person">
                    <div className="people__avatar">
                        <ImageLoader className="people__image" src={item.photos.small == null ? stub : item.photos.small} wrapper={React.createFactory('div')} 
                            preloader={spinner}>
                        </ImageLoader>
                        <div>
                            {
                                item.followed
                                ? <button disabled={props.FOLLOW_ARRAY.some(id => id === item.id)} className="people__follow" 
                                onClick={()=> {
                                    // Заблокируем кнопку
                                    props.TOGGLE_FOLLOWING_AC(true, item.id);
                                    UNFOLLOW_API(item.id).then(data => {
                                        if(data.resultCode == 0) {
                                            props.UNFOLLOW_AC (item.id);
                                            // Разблокируем кнопку
                                            props.TOGGLE_FOLLOWING_AC(false, item.id);
                                        }
                                    });
                                }}>UNFOLLOW</button>

                                : <button disabled={props.FOLLOW_ARRAY.some(id => id === item.id)} className="people__follow"
                                onClick={()=> {
                                    // Заблокируем кнопку
                                    props.TOGGLE_FOLLOWING_AC(true, item.id);
                                    FOLLOW_API(item.id).then(data => {
                                        if(data.resultCode == 0) {
                                            props.FOLLOW_AC(item.id);
                                            // Разблокируем кнопку
                                            props.TOGGLE_FOLLOWING_AC(false, item.id);
                                        }
                                    });                                
                                }}>FOLLOW</button>
                            }
                        </div>
                    </div>
                    <div className="people__info">
                        <NavLink className="people__name" to={'/profile/' + item.id}>
                            {item.name}
                        </NavLink>
                        <p className="people__status">{item.status == null ? '.............' : item.status}</p>
                    </div>
                </div>
            )}

            <Pagination onPageChanged={props.PAGE_CHANGED_PEOPLE_SERVER} 
                        currentPage={props.currentPage} 
                        size={props.pageSize} 
                        count={props.totalCount}
            />
            
        </div>
    )
}

// Презентацинная компонента Profile
class PeopleServer extends React.Component {

    componentDidMount() {   
        // Покажем прелоадер
        this.props.TOGGLE_IS_CONNECT_AC(true);    
        PEOPLE_API(this.props.currentPage, this.props.pageSize).then(data => {
            // Получим количество пользователей
            this.props.SET_USERS_COUNT_AC(data.totalCount);
            this.props.SET_USERS_COUNT_AC(20);
            // Получим пользователей
            this.props.SET_USERS_DATA_AC(data.items);
            // Убрем прелоадер
            this.props.TOGGLE_IS_CONNECT_AC(false);
        });
    }

    PAGE_CHANGED_PEOPLE_SERVER = (page) => {
        // Покажем прелоадер
        this.props.TOGGLE_IS_CONNECT_AC(true);
        // Установим текущую страницу
        this.props.SET_CURRENT_PAGE_AC(page);
        PEOPLE_API(page, this.props.pageSize).then(data => {
            this.props.SET_USERS_DATA_AC(data.items);
            // Покажем прелоадер
            this.props.TOGGLE_IS_CONNECT_AC(false);
        });
    }

    render() {
        return ( 
            this.props.IS_CONNECT ? <Preloader/> :
            <People 
                totalCount                           = {this.props.totalCount} 
                pageSize                             = {this.props.pageSize}
                currentPage                          = {this.props.currentPage}
                people                               = {this.props.people}
                FOLLOW_AC                            = {this.props.FOLLOW_AC}
                UNFOLLOW_AC                          = {this.props.UNFOLLOW_AC }
                IS_CONNECT                           = {this.props.IS_CONNECT}
                PAGE_CHANGED_PEOPLE_SERVER           = {this.PAGE_CHANGED_PEOPLE_SERVER}
                FOLLOW_ARRAY                         = {this.props.FOLLOW_ARRAY}
                TOGGLE_FOLLOWING_AC                  = {this.props.TOGGLE_FOLLOWING_AC}
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
    TOGGLE_FOLLOWING_AC
})(PeopleServer);

export default PeopleBox;