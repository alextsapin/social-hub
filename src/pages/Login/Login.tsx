/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useEffect } from 'react';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Img } from 'react-image';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { maxPass, minPass } from '../../shared/constants';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import css from './login.module.scss';
import { getCaptcha, loginization } from './login.reducer';

type FormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

const loginSchema = yup.object().shape({
    email: yup.string().email('Please enter a valid email').required(),
    password: yup.string().min(minPass).max(maxPass).required(),
    captcha: yup.string().min(minPass).max(maxPass),
});

export const Login = (): ReactElement => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isAuth = useAppSelector(state => state.auth.isAuth);
    const captcha = useAppSelector(state => state.auth.captchaUrl);

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth]);

    const formik = useFormik({
        initialValues: {
            email: process.env.REACT_APP_API_EMAIL || 'alextsapin@yandex.ru',
            password: process.env.REACT_APP_API_PASSWORD || 'wXq1EbIL',
            rememberMe: true,
            captcha: '',
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

                {captcha && (
                    <div className={css.box}>
                        <Img
                            className={css.img}
                            loader={
                                <Skeleton
                                    style={{ display: 'block', marginTop: '10px' }}
                                    variant="rectangular"
                                    animation="wave"
                                    height={100}
                                    width={188}
                                />
                            }
                            src={captcha}
                            alt="img"
                        />
                        <Button
                            color="success"
                            variant="contained"
                            size="small"
                            className={css.reset}
                            endIcon={<RestartAltIcon />}
                            onClick={() => dispatch(getCaptcha())}
                        >
                            New code
                        </Button>
                        <TextField
                            name="captcha"
                            value={formik.values.captcha}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            label="Symbols"
                            size="small"
                            className={css.field}
                            error={!!formik.touched.captcha}
                        />
                    </div>
                )}
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
                    Send
                </Button>
            </form>
        </Container>
    );
};
