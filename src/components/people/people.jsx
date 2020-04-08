import React from 'react';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import preloader from '../preloader/preloader.jsx';
import * as axios from 'axios';


// ACTION CREATOR
import {followAC, unfollowAC, setUserDataAC} from '../../redux/people-reducer.js';

// Презентацинная компонента Profile
const People = (props) => {

    if(props.people.length === 0) {
        // Запрос на сервер
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            props.setUsers(responce.data.items);
        });

        props.setUserData([
            {id:1, name:'Chloe', image:'chloe', status:'I`d like a cup of coffe', location:{country:'England', city:'London'}, followed:true},
            {id:2, name:'Won', image:'won', status:'Samsung the best', location:{country:'Korea', city:'Seul'}, followed:false},
            {id:3, name:'Matt', image:'matt', status:'I like spanish girls', location:{country:'Spain', city:'Barcelona'}, followed:false}
        ]);
    }
    
    return (
        <div id="content">
            {props.people.map(item => 
                <div className="people__person">
                    <div className="people__avatar">
                        <img src={'/images/' + item.image + '.png'} alt=""/>
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

            <button className="people__follow people__follow_show">SHOW MORE</button>
        </div>
    );
}

// Контейнерная компонента Profile
let mapStateToProps = (state) => {
    return {
        people: state.people.userData
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
        }
    }
}

const PeopleBox = connect(mapStateToProps, mapDispatchToProps)(People);

export default PeopleBox;