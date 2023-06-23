/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useState, useEffect } from 'react';

import { getStatus, setStatusTC } from '../../pages/Profile/profileReducer';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import css from './status.module.scss';

type PropsType = {
    id: string | undefined;
};

export const Status = ({ id }: PropsType): ReactElement => {
    const dispatch = useAppDispatch();

    const userId = useAppSelector(state => state.auth.userId);
    const status = useAppSelector(state => state.profile.status);

    const [editMode, setEditMode] = useState(false);
    const [newStatus, setNewStatus] = useState(status);

    useEffect(() => {
        if (id) {
            dispatch(getStatus(Number(id)));
        }
    }, [id]);

    useEffect(() => {
        setNewStatus(status);
    }, [status]);

    function onChangeHandler(value: string): void {
        setNewStatus(value);
    }

    function turnOnHandler(): void {
        setEditMode(false);
        if (newStatus) {
            dispatch(setStatusTC(newStatus));
        }
    }

    function turnOffHandler(): void {
        if (Number(userId) === Number(id)) {
            setEditMode(true);
        }
    }

    return (
        <div className={css.status}>
            {editMode ? (
                <input
                    className={css.input}
                    value={newStatus}
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
