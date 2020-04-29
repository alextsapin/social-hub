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
    follow, 
    unfollow, 
    setUserData, 
    setCurrentPage, 
    setTotalUserCount, 
    TOGGLE_IS_CONNECT_AC, 
    TOGGLE_FOLLOWING_AC
} from '../../redux/people-reducer.js';

// DAL
import {peopleAPI, followAPI, unfollowAPI} from '../../api/api.js';

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
                                    unfollowAPI(item.id).then(data => {
                                        if(data.resultCode == 0) {
                                            props.unfollow(item.id);
                                            // Разблокируем кнопку
                                            props.TOGGLE_FOLLOWING_AC(false, item.id);
                                        }
                                    });
                                }}>UNFOLLOW</button>

                                : <button disabled={props.FOLLOW_ARRAY.some(id => id === item.id)} className="people__follow"
                                onClick={()=> {
                                    // Заблокируем кнопку
                                    props.TOGGLE_FOLLOWING_AC(true, item.id);
                                    followAPI(item.id).then(data => {
                                        if(data.resultCode == 0) {
                                            props.follow(item.id);
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

            <Pagination onPageChanged={props.onPageChanged} currentPage={props.currentPage} size={props.pageSize} count={props.totalCount}/>
            
        </div>
    )
}

// Презентацинная компонента Profile
class PeopleServer extends React.Component {

    componentDidMount() {   
        // Покажем прелоадер
        this.props.TOGGLE_IS_CONNECT_AC(true);    
        peopleAPI(this.props.currentPage, this.props.pageSize).then(data => {
            // Получим количество пользователей
            this.props.setTotalUserCount(data.totalCount);
            this.props.setTotalUserCount(25);
            // Получим пользователей
            this.props.setUserData(data.items);
            // Убрем прелоадер
            this.props.TOGGLE_IS_CONNECT_AC(false);
        });
    }

    onPageChanged = (page) => {
        // Покажем прелоадер
        this.props.TOGGLE_IS_CONNECT_AC(true);
        // Установим текущую страницу
        this.props.setCurrentPage(page);
        peopleAPI(page, this.props.pageSize).then(data => {
            this.props.setUserData(data.items);
            // Покажем прелоадер
            this.props.TOGGLE_IS_CONNECT_AC(false);
        });
    }

    render() {
        return ( 
            this.props.IS_CONNECT ? <Preloader/> :
            <People 
                totalCount              = {this.props.totalCount} 
                pageSize                = {this.props.pageSize}
                currentPage             = {this.props.currentPage}
                people                  = {this.props.people}
                follow                  = {this.props.follow}
                unfollow                = {this.props.unfollow}
                IS_CONNECT              = {this.props.IS_CONNECT}
                onPageChanged           = {this.onPageChanged}
                FOLLOW_ARRAY            = {this.props.FOLLOW_ARRAY}
                TOGGLE_FOLLOWING_AC     = {this.props.TOGGLE_FOLLOWING_AC}
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
        currentPage:         state.people.currentPage,
        IS_CONNECT:          state.people.IS_CONNECT,
        FOLLOW_ARRAY:        state.people.FOLLOW_ARRAY
    }
}

const PeopleBox = connect(mapStateToProps, {follow, unfollow, setUserData, setCurrentPage, setTotalUserCount, TOGGLE_IS_CONNECT_AC, TOGGLE_FOLLOWING_AC})(PeopleServer);

export default PeopleBox;