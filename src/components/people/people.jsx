import React from 'react';
import {NavLink} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import preloader from '../preloader/preloader.jsx';

// IMG
import loading from '../../images/loading.gif';
import stub from '../../images/stub-small.png';

// ACTION CREATOR
import {follow, unfollow, setUserData, setCurrentPage, setTotalUserCount, toggleIsFetching, toggleFollowingProgress} from '../../redux/people-reducer.js';

// DAL
import {peopleAPI, followAPI, unfollowAPI} from '../../api/api.js';

let People = (props) => {

    let pageCount = Math.ceil(props.totalCount / props.pageSize);
    let pages = [];

    for(let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <div id="content">
            {props.people.map(item => 
                <div className="people__person">
                    <div className="people__avatar">
                        <ImageLoader className="people__image" src={item.photos.small == null ? stub : item.photos.small} wrapper={React.createFactory('div')} 
                            preloader={preloader}>
                        </ImageLoader>
                        <div>
                            {
                                item.followed
                                ? <button disabled={props.followingInProgress.some(id => id === item.id)} className="people__follow" 
                                onClick={()=> {
                                    unfollowAPI(item.id).then(data => {
                                        if(data.resultCode == 0) {
                                            props.unfollow(item.id);
                                        }
                                    });
                                }}>UNFOLLOW</button>

                                : <button disabled={props.followingInProgress.some(id => id === item.id)} className="people__follow"
                                onClick={()=> {
                                    followAPI(item.id).then(data => {
                                        if(data.resultCode == 0) {
                                            props.follow(item.id);
                                        }
                                    });                                
                                }}>FOLLOW</button>
                            }
                        </div>
                    </div>
                    <div className="people__info">
                        <NavLink to={'/profile/' + item.id}><h2 className="people__name">{item.name}</h2></NavLink>
                        <p className="people__status">{item.status == null ? '.............' : item.status}</p>
                    </div>
                </div>
            )}
            <div className="pagination">
                {
                    pages.map(p => {
                        return <span onClick={() => {props.onPageChanged(p)}} className={props.currentPage === p && 'pagination__link'}>{p}</span>}
                    )
                }
            </div>
        </div>
    )
}

// Презентацинная компонента Profile
class PeopleServer extends React.Component {

    componentDidMount() {       
        peopleAPI(this.props.currentPage, this.props.pageSize).then(data => {
            // Покажем прелоадер
            this.props.toggleIsFetching(true);
            // Получим количество пользователей
            this.props.setTotalUserCount(data.totalCount);
            this.props.setTotalUserCount(25);
            // Получим пользователей
            this.props.setUserData(data.items);
            // Убрем прелоадер
            this.props.toggleIsFetching(false);
        });
    }

    onPageChanged = (page) => {
        // Покажем прелоадер
        this.props.toggleIsFetching(true);
        // Установим текущую страницу
        this.props.setCurrentPage(page);
        peopleAPI(page, this.props.pageSize).then(data => {
            this.props.setUserData(data.items);
            // Покажем прелоадер
            this.props.toggleIsFetching(false);
        });
    }

    render() {
        return ( 
            this.props.isFetching ? <img src={loading}/> :
            <People 
                totalCount              = {this.props.totalCount} 
                pageSize                = {this.props.pageSize}
                currentPage             = {this.props.currentPage}
                people                  = {this.props.people}
                follow                  = {this.props.follow}
                unfollow                = {this.props.unfollow}
                isFetching              = {this.props.isFetching}
                onPageChanged           = {this.onPageChanged}
                followingInProgress     = {this.props.followingInProgress}
                toggleFollowingProgress = {this.props.toggleFollowingProgress}
            />
        );
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state) => {
    return {
        people:              state.people.userData,
        pageSize:            state.people.pageSize,
        totalCount:          state.people.totalCount,
        currentPage:         state.people.currentPage,
        isFetching:          state.people.isFetching,
        followingInProgress: state.people.followingInProgress
    }
}

const PeopleBox = connect(mapStateToProps, {follow, unfollow, setUserData, setCurrentPage, setTotalUserCount, toggleIsFetching, toggleFollowingProgress})(PeopleServer);

export default PeopleBox;