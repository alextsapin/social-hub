/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import Button from '@mui/material/Button';

import { toggleFollow } from '../../pages/Home/home.reducer';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import css from './follow.module.scss';

type PropsType = {
    id: number;
    followed: boolean;
    followUsers: Array<number>;
};

export const Follow = (props: PropsType): ReactElement => {
    const dispatch = useAppDispatch();

    const isAuth = useAppSelector(state => state.auth.isAuth);
    const users = useAppSelector(state => state.home.users);
    const userId = useAppSelector(state => state.auth.userId);

    if (!isAuth) {
        return <div />;
    }

    return (
        <Button
            disabled={props.followUsers.some(id => id === props.id) || userId === props.id}
            className={css.button}
            onClick={() => {
                dispatch(toggleFollow(props.id, users));
            }}
            variant="contained"
        >
            {props.followed ? (
                <div className={css.wrap}>
                    <PersonAddDisabledIcon />
                    <span className={css.indent}>UNFOLLOW</span>
                </div>
            ) : (
                <div className={css.wrap}>
                    <PersonAddIcon />
                    <span className={css.indent}>FOLLOW</span>
                </div>
            )}
        </Button>
    );
};
