/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState, useEffect, ChangeEvent } from 'react';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import user from '../../entities/User/user.jpg';
import { getStatus, setAvatarTC, setStatusTC } from '../../pages/Profile/profile.reducer';
import { profileAPI } from '../../shared/api/api';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import css from './avatar.module.scss';

type PropsType = {
    id: string | undefined;
    photo: string | null;
};

export const Avatar = (props: PropsType): ReactElement => {
    const dispatch = useAppDispatch();

    const userId = useAppSelector(state => state.auth.userId);

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            dispatch(setAvatarTC(file));
        }
    };

    return (
        <div className={css.wrap}>
            {props.photo !== null ? (
                <img className={css.img} src={props.photo} alt="img" />
            ) : (
                <img className={css.img} src={user} alt="img" />
            )}

            {userId !== Number(props.id) ? (
                ''
            ) : (
                <label className={css.upload}>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        accept="image/*"
                        onChange={uploadHandler}
                    />
                    <Button variant="contained" component="span">
                        <CloudUploadIcon />
                    </Button>
                </label>
            )}
        </div>
    );
};
