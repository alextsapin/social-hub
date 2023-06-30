/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import css from '../../pages/Profile/css.module.scss';

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

export const SocialMedia = (props: PropsType): ReactElement => {
    const keys = Object.keys(props.contacts).filter(el => el !== 'mainLink');

    const data = keys.map((el: string, index: number) => (
        <TableRow key={index} className={css.row}>
            <TableCell component="th" scope="row">
                {el}
            </TableCell>
            <TableCell>
                {Object.values(props.contacts)[index] ? Object.values(props.contacts)[index] : '44'}
            </TableCell>
        </TableRow>
    ));

    return (
        <>
            <p className={css.title}>Contacts:</p>
            <TableContainer className={css.info}>
                <Table aria-label="customized table">
                    <TableBody>{data}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
