import React from 'react';

// Icons
import {PersonPlusIcon} from '../../icons/icons.js';

type propsType = {
    id: number;
    followed: boolean;
    followUsers: Array<number>;
    unfollowTC: (id: number) => void;
    followTC: (id: number) => void;
}

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