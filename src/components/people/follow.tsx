import React from 'react';
import {PersonPlusIcon} from '../../icons/icons.js';
import {personFollowType, personFollowUsersType, personFollowTCType} from './type';

type propsType = personFollowType & personFollowUsersType & personFollowTCType;

const Follow = (props: propsType) => {
    if(props.followed) {
        return (
            <button disabled={props.followUsers.some(id => id === props.id)} className="btn btn-secondary mt-1" 
                onClick={()=>{props.unfollowTC(props.id);}}>
                <PersonPlusIcon/>
                <span>UNFOLLOW</span>
            </button>)
    } else {
        return (
            <button disabled={props.followUsers.some(id => id === props.id)} className="btn btn-secondary mt-1" 
                onClick={()=>{props.followTC(props.id)}}>
                <PersonPlusIcon/>
                <span>FOLLOW</span>
            </button>
        )
    }
}

export default Follow;