import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {Img} from 'react-image';
import css from './Footer.module.scss';

import react from './images/react.png';
import redux from './images/redux.png';
import typescript from './images/typescript.png';
import js from './images/js.png';
import router from './images/router.png';

export const Footer = () => {
    return (
        <footer>
            <Container fixed>
                <Grid container>
                    <Grid item md={6} xs={12}>
                        <div className={css.technoBox}>
                            <Img className={css.image} src={react} alt="react"/>
                            <Img className={css.image} src={redux} alt="redux"/>
                            <Img className={css.image} src={js} alt="javascript"/>
                            <Img className={css.image} src={router} alt="react-router"/>
                        </div>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <div className={css.typeBox}>
                            <Img className={css.image} src={typescript} alt="typescript"/>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    )
}
