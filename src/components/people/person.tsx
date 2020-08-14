import React from 'react';
import {NavLink} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import spinner from '../spinners/imageSpinner';

import Follow from './follow';

type propsType = {
    id: number;
    name: string;
    isAuth: boolean;
    image: string;
    status: string;
    followed: boolean;
    followUsers: Array<number>;
    unfollowTC: (id: number) => void;
    followTC: (id: number) => void;
}

const Person = (props: propsType) => {
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
                        {props.isAuth ? <Follow {...props}/> : ''}
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