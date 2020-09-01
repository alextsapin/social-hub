import React from 'react';
import {NavLink} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import spinner from '../spinners/imageSpinner';
import Follow from './follow';

// Material-UI
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import Paper from '@material-ui/core/Paper';

type PropsType = {
    id: number
    followed: boolean
    name: string
    image: string
    status: string | null
    isAuth: boolean
    followUsers: Array<number>
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
}

const Person = (props: PropsType) => {
    return (
        <div className="col-md-3 col-sm-4 col-6">
            <Paper elevation={3}>
                <div className="people__person">     
                    <NavLink className="people__name" to={'/profile/' + props.id}>{props.name}</NavLink>       

                    <div className="people__avatar mt-2">
                        <NavLink to={'/profile/' + props.id}>
                            <ImageLoader src={props.image} wrapper={React.createFactory('div')} 
                                preloader={spinner}>
                            </ImageLoader>
                        </NavLink>

                        <p className="mt-2">
                            {
                                props.status != null ?
                                props.status:
                                <NotInterestedIcon/>
                            }
                        </p>

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
            </Paper>
        </div>
    )
}

export default Person;