import React from 'react';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import preloader from '../preloader/preloader.jsx';
import * as axios from 'axios';


// ACTION CREATOR
import {followAC, unfollowAC, setUserDataAC, setCurrentPageAC, setTotalUserCountAC} from '../../redux/people-reducer.js';

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
                        <ImageLoader src={'/images/' + item.image + '.png'} wrapper={React.createFactory('div')} preloader={preloader}></ImageLoader>
                        <div>
                            {
                                item.followed ? 
                                <button className="people__follow" onClick={()=> {props.unfollow(item.id)}}>UNFOLLOW</button> :
                                <button className="people__follow" onClick={()=> {props.follow(item.id)}}>FOLLOW</button>
                            }
                        </div>
                    </div>
                    <div className="people__info">
                        <h2 className="people__name">{item.name}</h2>
                        <p className="people__location">{item.location.country}, {item.location.city}</p>
                        <p className="people__status">{item.status}</p>
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
class PeopleAjax extends React.Component {

    constructor(props) {
        super(props);
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page)
    }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setTotalUserCount(25);
        });

        this.props.setUserData([
            {id:1, name:'Chloe', image:'chloe', status:'I`d like a cup of coffe', location:{country:'England', city:'London'}, followed:true},
            {id:2, name:'Won', image:'won', status:'Samsung the best', location:{country:'Korea', city:'Seul'}, followed:false},
            {id:3, name:'Matt', image:'matt', status:'I like spanish girls', location:{country:'Spain', city:'Barcelona'}, followed:false}
        ]); 
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
        currentPage: state.people.currentPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (id) => {
            dispatch(followAC(id));
        },
        unfollow: (id) => {
            dispatch(unfollowAC(id)); 
        },
        setUserData: (userData) => {
            dispatch(setUserDataAC(userData));
        },
        setCurrentPage: (page) => {
            dispatch(setCurrentPageAC(page))
        },
        setTotalUserCount: (totalCount) => {
            dispatch(setTotalUserCountAC(totalCount))
        }
    }
}

const PeopleBox = connect(mapStateToProps, mapDispatchToProps)(PeopleAjax);

export default PeopleBox;