/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { ReactElement, useEffect, useState } from 'react';

import { useAppDispatch } from '../../shared/hooks/useAppDispatch';

import css from './form.module.scss';

export const SearchForm = (): ReactElement => {
    const dispatch = useAppDispatch();

    const DELAY = 1500;

    const [querry, setQuerry] = useState('');
    const [timerId, setTimerId] = useState(0);

    const debounce = (): void => {
        clearTimeout(timerId);
        setTimerId(
            +setTimeout(() => {
                // dispatch(getCards(querry));
            }, DELAY),
        );
    };

    useEffect(() => {
        debounce();
    }, [querry]);

    return (
        <div className={css.wrapper}>
            <input
                value={querry}
                onChange={e => setQuerry(e.currentTarget.value)}
                type="text"
                className={css.input}
                placeholder="Search author"
            />
            🔍
        </div>
    );
};
