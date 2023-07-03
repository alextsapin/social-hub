/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';

import { getStatus, setStatusTC } from '../../pages/Profile/profile.reducer';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import css from './status.module.scss';

type PropsType = {
    id: string | undefined;
    status: string | null;
};

export const Status = (props: PropsType): ReactElement => {
    const dispatch = useAppDispatch();

    const userId = useAppSelector(state => state.auth.userId);

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        dispatch(getStatus(Number(props.id)));
    }, [props.id]);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    function onChangeHandler(value: string): void {
        setStatus(value);
    }

    function turnOnHandler(): void {
        const trimmed = status ? status.trim() : null;

        if (trimmed) {
            setEditMode(false);
            dispatch(setStatusTC(trimmed));
        }
    }

    function turnOffHandler(): void {
        if (Number(userId) === Number(props.id)) {
            setEditMode(true);
        }
    }

    if (!props.status) {
        return <div />;
    }

    return (
        <div className={css.status}>
            {editMode ? (
                <TextField
                    size="small"
                    className={css.input}
                    value={status || ''}
                    onBlur={turnOnHandler}
                    onChange={e => onChangeHandler(e.currentTarget.value)}
                    autoFocus
                />
            ) : (
                <p className={css.text} onDoubleClick={turnOffHandler}>
                    {status}
                </p>
            )}
        </div>
    );
};
