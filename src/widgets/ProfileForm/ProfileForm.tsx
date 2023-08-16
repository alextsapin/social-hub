/* eslint-disable no-magic-numbers */
/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import { Checkbox, FormControlLabel, Tooltip } from '@material-ui/core';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Formik, Field, Form, useFormik } from 'formik';

import { updateProfile } from '../../pages/Profile/profile.reducer';
import { ProfileType } from '../../pages/Profile/types';
import { useAppDispatch } from '../../shared/hooks';

import css from './form.module.scss';

export type ValuesType = {
    userId: number;
    fullName: string;
    aboutMe: string | null;
    lookingForAJob: boolean;
    lookingForAJobDescription: string | null;
    facebook: string | null;
    github: string | null;
    instagram: string | null;
    mainLink: string | null;
    twitter: string | null;
    vk: string | null;
    website: string | null;
    youtube: string | null;
};

type PropsType = {
    userProfile: ProfileType;
    setEditMode(value: boolean): void;
};

export const ProfileForm = (props: PropsType): ReactElement => {
    // debugger;
    const dispatch = useAppDispatch();
    const keys = Object.keys(props.userProfile.contacts).filter(el => el !== 'mainLink');

    const data = keys.map((el: string, index: number) => (
        <TableRow key={index} className={css.row}>
            <TableCell component="th" scope="row">
                {el}
            </TableCell>
            <TableCell>
                {Object.values(props.userProfile.contacts)[index] ? (
                    Object.values(props.userProfile.contacts)[index]
                ) : (
                    <NotInterestedIcon />
                )}
            </TableCell>
        </TableRow>
    ));

    const formik = useFormik({
        initialValues: {
            userId: props.userProfile.userId,
            fullName: props.userProfile.fullName,
            aboutMe: props.userProfile.aboutMe,
            lookingForAJob: props.userProfile.lookingForAJob,
            lookingForAJobDescription: props.userProfile.lookingForAJobDescription,
            facebook: props.userProfile.contacts.facebook,
            website: props.userProfile.contacts.website,
            vk: props.userProfile.contacts.vk,
            twitter: props.userProfile.contacts.twitter,
            instagram: props.userProfile.contacts.instagram,
            youtube: props.userProfile.contacts.youtube,
            github: props.userProfile.contacts.github,
            mainLink: null,
        },
        onSubmit: (values: ValuesType, actions) => {
            props.setEditMode(false);
            dispatch(updateProfile(values));
            actions.resetForm();
        },
    });

    return (
        <div>
            <form className={css.form} onSubmit={formik.handleSubmit}>
                <div className={css.row}>
                    <label htmlFor="website">Full name</label>
                    <TextField
                        className={css.input}
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="small"
                    />
                </div>

                <div className={css.row}>
                    <label htmlFor="website">About me</label>
                    <TextField
                        className={css.input}
                        name="aboutMe"
                        value={formik.values.aboutMe}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="small"
                    />
                </div>

                <div className={css.row}>
                    <label>Looking for a job</label>

                    <FormControlLabel
                        control={
                            <Checkbox color="primary" checked={formik.values.lookingForAJob} />
                        }
                        label=""
                        name="lookingForAJob"
                        onChange={formik.handleChange}
                    />
                </div>

                <div className={css.row}>
                    <label htmlFor="website">Looking for a job description</label>
                    <TextField
                        className={css.input}
                        name="lookingForAJobDescription"
                        value={formik.values.lookingForAJobDescription}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="small"
                    />
                </div>

                <div className={css.row}>
                    <label htmlFor="website">Website</label>
                    <TextField
                        className={css.input}
                        name="website"
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="small"
                    />
                </div>

                <div className={css.row}>
                    <label htmlFor="website">VK</label>
                    <TextField
                        className={css.input}
                        name="vk"
                        value={formik.values.vk}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="small"
                    />
                </div>

                <div className={css.row}>
                    <label htmlFor="website">Twitter</label>
                    <TextField
                        className={css.input}
                        name="twitter"
                        value={formik.values.twitter}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="small"
                    />
                </div>

                <div className={css.row}>
                    <label htmlFor="website">Instagram</label>
                    <TextField
                        className={css.input}
                        name="instagram"
                        value={formik.values.instagram}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="small"
                    />
                </div>

                <div className={css.row}>
                    <label htmlFor="website">Youtube</label>
                    <TextField
                        className={css.input}
                        name="youtube"
                        value={formik.values.youtube}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="small"
                    />
                </div>

                <div className={css.row}>
                    <label htmlFor="website">Github</label>
                    <TextField
                        className={css.input}
                        name="github"
                        value={formik.values.github}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"
                        size="small"
                    />
                </div>

                <div className={css.row}>
                    <label />
                    <div>
                        <Tooltip title="Update profile">
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                color="primary"
                                style={{ marginRight: '10px' }}
                            >
                                <SaveIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Cancel">
                            <Button
                                onClick={() => props.setEditMode(false)}
                                variant="contained"
                                size="small"
                                color="secondary"
                            >
                                <CancelIcon />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            </form>
        </div>
    );
};
