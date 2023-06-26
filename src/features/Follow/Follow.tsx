/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import Button from '@mui/material/Button';

import { followTC, unFollowTC } from '../../pages/Home/homeReducer';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import css from './Follow.module.scss';

type PropsType = {
    id: number;
    followed: boolean;
    followUsers: Array<number>;
};

export const Follow = (props: PropsType): ReactElement => {
    const dispatch = useAppDispatch();

    const isAuth = useAppSelector(state => state.auth.isAuth);

    if (!isAuth) {
        return <div />;
    }

    if (props.followed) {
        return (
            <Button
                disabled={props.followUsers.some(id => id === props.id)}
                className={css.button}
                onClick={() => {
                    dispatch(unFollowTC(props.id));
                }}
                variant="contained"
            >
                <PersonAddDisabledIcon />
                <span className={css.indent}>UNFOLLOW</span>
            </Button>
        );
    }

    return (
        <Button
            disabled={props.followUsers.some(id => id === props.id)}
            className={css.button}
            onClick={() => {
                dispatch(followTC(props.id));
            }}
            variant="contained"
        >
            <PersonAddIcon />
            <span className={css.indent}>FOLLOW</span>
        </Button>
    );
};
