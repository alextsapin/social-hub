/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import { Img } from 'react-image';
import { NavLink } from 'react-router-dom';

import { Follow } from '../../features/Follow/Follow';
import { useAppSelector } from '../../shared/hooks';

import user from './user.jpg';
import css from './user.module.scss';

type UserPropsType = {
    id: number;
    name: string;
    photo: string;
    status: null | string;
    followed: boolean;
};

export const User = (props: UserPropsType): ReactElement => {
    const followUsers = useAppSelector(state => state.home.followUsers);

    return (
        <Grid item lg={3} md={4} sm={6} xs={12}>
            <Paper className={css.card} elevation={3}>
                <NavLink to={`/profile/${props.id}`} className={css.name}>
                    {props.name}
                </NavLink>
                <p className={css.status}>{props.status ? props.status : '...'}</p>
                {props.photo !== null ? (
                    <Img
                        className={css.avatar}
                        src={props.photo}
                        loader={
                            <Skeleton
                                className={css.avatar}
                                variant="circular"
                                width={100}
                                height={100}
                            />
                        }
                        alt="ava"
                    />
                ) : (
                    <Img
                        className={css.avatar}
                        src={user}
                        loader={
                            <Skeleton
                                className={css.avatar}
                                variant="circular"
                                width={100}
                                height={100}
                            />
                        }
                        alt="ava"
                    />
                )}
                <Follow id={props.id} followed={props.followed} followUsers={followUsers} />
            </Paper>
        </Grid>
    );
};
