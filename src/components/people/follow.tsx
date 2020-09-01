import React from 'react';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

type PropsType = {
    id: number
    followed: boolean
    followUsers: Array<number>
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
}

const Follow = (props: PropsType) => {
    if(props.followed) {
        return (
            <Button disabled={props.followUsers.some(id => id === props.id)} className="mt-2"
                onClick={()=>{props.unfollowTC(props.id);}} color="primary" variant="contained">
                <PersonAddIcon/>
                <span className="ml-1">UNFOLLOW</span>
            </Button>)
    } else {
        return (
            <Button disabled={props.followUsers.some(id => id === props.id)} className="mt-2" 
                onClick={()=>{props.followTC(props.id)}} color="primary" variant="contained">
                <PersonAddIcon/>
                <span className="ml-1">FOLLOW</span>
            </Button>
        )
    }
}

export default Follow;