import React, { ReactElement } from 'react';

import LoginIcon from '@mui/icons-material/Login';
import Tooltip from '@mui/material/Tooltip';
import { NavLink } from 'react-router-dom';

import css from './login.module.scss';

export const Login = (): ReactElement => {
    return (
        <Tooltip title="Login">
            <NavLink to="/login" className={css.link}>
                <LoginIcon fontSize="large" />
            </NavLink>
        </Tooltip>
    );
};
