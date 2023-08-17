import React, { ReactElement } from 'react';

import Container from '@mui/material/Container';

import spinner from './spinner.gif';

const Preloader = (): ReactElement => {
    return (
        <Container fixed>
            <img style={{ display: 'block', margin: '100px auto' }} src={spinner} alt="spinner" />
        </Container>
    );
};

export default Preloader;
