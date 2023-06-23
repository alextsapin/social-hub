/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import Button from '@mui/material/Button';

import { followTC, unFollowTC } from '../../pages/Home/homeReducer';
import { useAppDispatch } from '../../shared/hooks';

import css from './Follow.module.scss';

type PropsType = {
    id: number;
    followed: boolean;
    followUsers: Array<number>;
};

export const Follow = (props: PropsType): ReactElement => {
    const dispatch = useAppDispatch();

    console.log(props);

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
                UNFOLLOW
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
            FOLLOW
        </Button>
    );
};
