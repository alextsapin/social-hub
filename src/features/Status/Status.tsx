/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useState, useEffect } from 'react';

import { getStatus, setStatusTC } from '../../pages/Profile/profileReducer';
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
    }, []);

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
                <input
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
