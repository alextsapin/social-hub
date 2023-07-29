/* eslint-disable no-magic-numbers */
/* eslint-disable no-promise-executor-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { Formik, Field, Form, useFormik } from 'formik';

import css from './form.module.scss';

type ValuesType = {
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
    contacts: {
        facebook: string | null;
        github: string | null;
        instagram: string | null;
        mainLink: string | null;
        twitter: string | null;
        vk: string | null;
        website: string | null;
        youtube: string | null;
    };
};

export const ProfileForm = (props: PropsType): ReactElement => {
    const keys = Object.keys(props.contacts).filter(el => el !== 'mainLink');

    console.log(props.contacts);

    const data = keys.map((el: string, index: number) => (
        <TableRow key={index} className={css.row}>
            <TableCell component="th" scope="row">
                {el}
            </TableCell>
            <TableCell>
                {Object.values(props.contacts)[index] ? (
                    Object.values(props.contacts)[index]
                ) : (
                    <NotInterestedIcon />
                )}
            </TableCell>
        </TableRow>
    ));

    const formik = useFormik({
        initialValues: {
            facebook: props.contacts.facebook,
            website: props.contacts.website,
            vk: props.contacts.vk,
            twitter: props.contacts.twitter,
            instagram: props.contacts.instagram,
            youtube: props.contacts.youtube,
            github: props.contacts.github,
            mainLink: props.contacts.mainLink,
        },
        onSubmit: (values: ValuesType, actions) => {
            // dispatch(loginization(values));
            actions.resetForm();
            alert(JSON.stringify(values));
        },
    });

    return (
        <div>
            <form className={css.form} onSubmit={formik.handleSubmit}>
                <div className={css.row}>
                    <label htmlFor="facebook">facebook</label>
                    <TextField
                        className={css.input}
                        name="facebook"
                        value={formik.values.facebook}
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

                <Button variant="contained" type="submit">
                    SAVE
                </Button>
            </form>
        </div>
    );
};
