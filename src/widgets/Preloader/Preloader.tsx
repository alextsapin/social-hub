import React, { ReactElement } from 'react';

import Container from '@mui/material/Container';

import css from './Preloader.module.scss';
import spinner from './spinner.gif';

const Preloader = (): ReactElement => {
    return (
        <Container fixed>
            <img className={css.item} src={spinner} alt="spinner" />
        </Container>
    );
};

export default Preloader;
