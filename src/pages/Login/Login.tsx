/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect } from 'react';

import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { maxPass, minPass } from '../../shared/constants';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import css from './css.module.scss';
import { loginization } from './loginReducer';

type FormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

const loginSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    password: yup.string().min(minPass).max(maxPass).required(),
});

export const Login = (): ReactElement => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuth = useAppSelector(state => state.auth.isAuth);

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth]);

    const formik = useFormik({
        initialValues: {
            email: process.env.REACT_APP_API_EMAIL || '',
            password: process.env.REACT_APP_API_PASSWORD || '',
            rememberMe: false,
        },
        validationSchema: loginSchema,
        onSubmit: (values: FormValuesType, actions) => {
            dispatch(loginization(values));
            actions.resetForm();
        },
    });

    return (
        <Container className={css.content} fixed>
            <form onSubmit={formik.handleSubmit} className={css.form}>
                <TextField
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    label="Email"
                    size="small"
                    className={css.field}
                    error={!!(formik.errors.email && formik.touched.email)}
                />

                <TextField
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="password"
                    label="Password"
                    size="small"
                    className={css.field}
                    error={!!(formik.errors.password && formik.touched.password)}
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            name="rememberMe"
                            value={formik.values.rememberMe}
                            onChange={formik.handleChange}
                        />
                    }
                    label="Запомнить меня"
                />

                <Button
                    type="submit"
                    variant="contained"
                    className={css.button}
                    disabled={formik.isSubmitting}
                >
                    Отправить
                </Button>
            </form>
        </Container>
    );
};
