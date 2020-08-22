import React from 'react';
import {NavLink} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import spinner from '../spinners/imageSpinner';
import Follow from './follow';

type PropsType = {
    id: number
    followed: boolean
    name: string
    image: string
    status: string
    isAuth: boolean
    followUsers: Array<number>
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
}

const Person = (props: PropsType) => {
    return (
        <div className="people__person">
            <div className="row">
                <div className="col-md-4">
                    <div className="people__avatar">
                        <NavLink to={'/profile/' + props.id}>
                            <ImageLoader src={props.image} wrapper={React.createFactory('div')} 
                                preloader={spinner}>
                            </ImageLoader>
                        </NavLink>
                        {props.isAuth ? 
                            <Follow 
                                id={props.id} 
                                followed={props.followed} 
                                followUsers={props.followUsers} 
                                followTC={props.followTC}
                                unfollowTC={props.unfollowTC}
                            /> : ''}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="people__info">
                        <NavLink className="people__name" to={'/profile/' + props.id}>{props.name}</NavLink>
                        <p className="people__status">{props.status}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Person;