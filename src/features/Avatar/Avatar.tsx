/* eslint-disable no-magic-numbers */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement, ChangeEvent } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { Img } from 'react-image';

import user from '../../entities/User/user.jpg';
import { setAvatarTC } from '../../pages/Profile/profile.reducer';
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
