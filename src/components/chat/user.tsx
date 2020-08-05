import React from 'react';
import ImageLoader from 'react-imageloader';
import spinner from '../spinners/imageSpinner';

type PropsType = {
    id: number;
    name: string;
    image: string;
    message: string;
}

const User = (props: PropsType) => {
    return (
        <div className="chat row">
            <div className="col-md-3">
                <div className="chat__user">
                    <ImageLoader src={props.image} wrapper={React.createFactory('div')} preloader={spinner}></ImageLoader>
                    <p className="chat__name">{props.name}</p>
                </div>
            </div>
            <div className="col-md-9 d-inline-flex flex-column justify-content-center">
                <p className="chat__message">{props.message}</p>
            </div>
        </div>
    );
}

export default User;