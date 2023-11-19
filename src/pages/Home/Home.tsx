/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { User } from '../../entities/User/User';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Paginator } from '../../widgets/Paginator/Paginator';
import Preloader from '../../widgets/Preloader/Preloader';

import css from './home.module.scss';
import { getUsersTC } from './home.reducer';

export const Home = (): ReactElement => {
    const dispatch = useAppDispatch();

    const currentPage = useAppSelector(state => state.home.currentPage);
    const usersCount = useAppSelector(state => state.home.usersCount);
    const pageSize = useAppSelector(state => state.home.pageSize);
    const users = useAppSelector(state => state.home.users);
    const isFetching = useAppSelector(state => state.home.isFetching);

    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled) {
            dispatch(getUsersTC(currentPage, pageSize));
        }

        return () => {
            isCancelled = true;
        };
    }, []);

    useEffect(() => {
        let isCancelled = false;

        if (!isCancelled) {
            dispatch(getUsersTC(currentPage, pageSize));
        }

        return () => {
            isCancelled = true;
        };
    }, [currentPage, usersCount]);

    if (isFetching) {
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
            <Paginator />
        </Container>
    );
};
