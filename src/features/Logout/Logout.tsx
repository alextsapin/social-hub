import React, { ReactElement } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

import { logout } from '../../pages/Login/login.reducer';
import { useAppDispatch } from '../../shared/hooks';

import css from './logout.module.scss';

export const Logout = (): ReactElement => {
    const dispatch = useAppDispatch();

    return (
        <Tooltip title="Logout">
            <button type="button" className={css.button} onClick={() => dispatch(logout())}>
                <LogoutIcon fontSize="large" />
            </button>
        </Tooltip>
    );
};
