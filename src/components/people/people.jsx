import React from 'react';
import {NavLink} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import preloader from '../preloader/preloader.jsx';
import * as axios from 'axios';

// ACTION CREATOR
import {follow, unfollow, setUserData, setCurrentPage, setTotalUserCount, toggleFollowProgress} from '../../redux/people-reducer.js';
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
                        <ImageLoader src={'/images/' + item.image + '.png'} wrapper={React.createFactory('div')} 
                            preloader={preloader}>
                        </ImageLoader>
                        <div>
                            {
                                item.followed ? 
                                <button disabled={props.followProgress.some(id => id === item.id)}  
                                onClick={()=> {
                                    unfollowAPI(item.id).then(data => {
                                        if(data.resultCode == 0) {
                                            props.unfollow(item.id);
                                        }
                                    });
                                }}>UNFOLLOW</button> :

                                <button disabled={props.followProgress.some(id => id === item.id)} /* className="people__follow" */ onClick={()=> {
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
                        <p className="people__status">{item.status}</p>
                    </div>
                </div>
            )}
            <div className="pagination">
                {
                    pages.map(p => {
                        return <span onClick={(e) => {props.onPageChanged(p)}} className={props.currentPage === p && 'pagination__link'}>{p}</span>}
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
            //this.props.setTotalUserCount(response.data.totalCount);
            this.props.setTotalUserCount(25);
            this.props.setUserData(data.items);
        });
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        peopleAPI(page, this.props.pageSize).then(data => {
            this.props.setUserData(data.items);
        });
    }

    render() {
        return ( 
            <People 
                totalCount={this.props.totalCount} 
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                people={this.props.people}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followProgress={this.props.followProgress}
                onPageChanged={this.onPageChanged}
            />
        );
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state) => {
    return {
        people: state.people.userData,
        pageSize: state.people.pageSize,
        totalCount: state.people.totalCount,
        currentPage: state.people.currentPage,
        followProgress: state.people.followProgress
    }
}

const PeopleBox = connect(mapStateToProps, {follow, unfollow, setUserData, setCurrentPage, setTotalUserCount, toggleFollowProgress})(PeopleServer);

export default PeopleBox;