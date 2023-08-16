/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import { Img } from 'react-image';
import { NavLink } from 'react-router-dom';

import { Login } from '../../features/Login/Login';
import { Logout } from '../../features/Logout/Logout';
import { authentication } from '../../pages/Login/login.reducer';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import { Error } from '../Error/Error';

import css from './css.module.scss';
import logo from './logo.png';

export const Header = (): ReactElement => {
    const id = useAppSelector(state => state.auth.userId);
    const avaLink = useAppSelector(state => state.auth.avaLink);
    const isAuth = useAppSelector(state => state.auth.isAuth);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authentication());
    }, []);

    useEffect(() => {
        dispatch(authentication());
    }, [isAuth]);

    return (
        <AppBar position="static">
            <Error />
            <Container fixed>
                <div className={css.wrapper}>
                    <NavLink to="/">
                        <Img
                            className={css.logo}
                            src={logo}
                            loader={<Skeleton variant="circular" width={50} height={50} />}
                            alt="logo"
                        />
                    </NavLink>

                    <div className={css.avatarBox}>
                        {avaLink !== null ? (
                            <NavLink to={`/profile/${id}`}>
                                <Avatar src={avaLink} alt="ava" />
                            </NavLink>
                        ) : (
                            <Avatar src="" alt="ava" />
                        )}
                        {id === null ? <Login /> : <Logout />}
                    </div>
                </div>
            </Container>
        </AppBar>
    );
};
