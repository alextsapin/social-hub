/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import NotInterestedIcon from '@mui/icons-material/NotInterested';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import css from '../../pages/Profile/profile.module.scss';
import { ProfileType } from '../../pages/Profile/profile.types';

type PropsType = {
    userProfile: ProfileType;
};

export const ProfileData = (props: PropsType): ReactElement => {
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

    return (
        <>
            <TableContainer className={css.info}>
                <Table aria-label="customized table">
                    <TableBody>
                        <TableRow className={css.row}>
                            <TableCell component="th" scope="row">
                                Briefly about yourself
                            </TableCell>
                            <TableCell>{props.userProfile.aboutMe}</TableCell>
                        </TableRow>

                        <TableRow className={css.row}>
                            <TableCell component="th" scope="row">
                                Looking for a job?
                            </TableCell>
                            <TableCell>
                                {props.userProfile.lookingForAJob === true ? 'Yes' : 'No'}
                            </TableCell>
                        </TableRow>

                        <TableRow className={css.row}>
                            <TableCell component="th" scope="row">
                                Reason for searching
                            </TableCell>
                            <TableCell>{props.userProfile.lookingForAJobDescription}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <p className={css.title}>Contacts:</p>
            <TableContainer className={css.info}>
                <Table aria-label="customized table">
                    <TableBody>{data}</TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
