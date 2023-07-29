/* eslint-disable no-magic-numbers */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    ReactElement,
    useState,
    useEffect,
    ChangeEvent,
    useRef,
    useLayoutEffect,
} from 'react';

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { Img } from 'react-image';

import user from '../../entities/User/user.jpg';
import { getStatus, setAvatarTC, setStatusTC } from '../../pages/Profile/profile.reducer';
import { profileAPI } from '../../shared/api/api';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import css from './avatar.module.scss';
import spinner from './spinner.gif';

type PropsType = {
    id: string | undefined;
    photo: string | null;
};

export const Avatar = (props: PropsType): ReactElement => {
    const dispatch = useAppDispatch();

    const userId = useAppSelector(state => state.auth.userId);
    const isUploadAva = useAppSelector(state => state.profile.isUploadAva);

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0];

            dispatch(setAvatarTC(file));
        }
    };

    return (
        <div className={css.wrap}>
            {isUploadAva ? <img className={css.spinner} src={spinner} alt="" /> : ''}
            {props.photo !== null ? (
                <Img
                    className={css.img}
                    loader={
                        <Skeleton
                            style={{ display: 'block' }}
                            variant="rectangular"
                            animation="wave"
                            height={250}
                        />
                    }
                    src={props.photo}
                    alt="img"
                />
            ) : (
                <Img className={css.img} src={user} alt="img" />
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
