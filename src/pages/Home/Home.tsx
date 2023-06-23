/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { User } from '../../entities/User/User';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Paginator } from '../../widgets/Paginator/Paginator';
import Preloader from '../../widgets/Preloader/Preloader';

import css from './css.module.scss';
import { getUsersTC, setCurrentPageAC } from './homeReducer';

export const Home = (): ReactElement => {
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector(state => state.users.currentPage);
    const usersCount = useAppSelector(state => state.users.usersCount);
    const pageSize = useAppSelector(state => state.users.pageSize);
    const users = useAppSelector(state => state.users.users);

    useEffect(() => {
        dispatch(getUsersTC(currentPage, usersCount, pageSize));
    }, []);

    useEffect(() => {
        dispatch(getUsersTC(currentPage, usersCount, pageSize));
    }, [currentPage, usersCount]);

    function pageChangeHandler(pageNumber: number): void {
        dispatch(setCurrentPageAC(pageNumber));
    }

    if (users.length === 0) {
        return <Preloader />;
    }

    const usersJSX = users.map((item: any) => {
        return (
            <User
                key={item.id}
                id={item.id}
                name={item.name}
                status={item.status}
                photo={item.photos.small}
                followed={item.followed}
            />
        );
    });

    return (
        <Container fixed>
            <h1 className="title title_first">
                Всего{' '}
                <span className={css.count}>
                    {new Intl.NumberFormat('ru-RU').format(usersCount)}
                </span>{' '}
                пользователей
            </h1>
            <Grid container spacing={3}>
                {usersJSX}
            </Grid>
            <Paginator pageChange={(pageNumber: number) => pageChangeHandler(pageNumber)} />
        </Container>
    );
};
