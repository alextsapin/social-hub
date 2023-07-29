/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement, useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useParams, useNavigate } from 'react-router-dom';

import { Avatar } from '../../features/Avatar/Avatar';
import { Status } from '../../features/Status/Status';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';
import Preloader from '../../widgets/Preloader/Preloader';
import { ProfileForm } from '../../widgets/ProfileForm/ProfileForm';
import { SocialMedia } from '../../widgets/SocialMedia/SocialMedia';
import { Wall } from '../../widgets/Wall/Wall';

import css from './css.module.scss';
import { getUserProfileTC } from './profile.reducer';

const Profile = (): ReactElement => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { id } = useParams();
    const userId = useAppSelector(state => state.auth.userId);
    const userProfile = useAppSelector(state => state.profile.userProfile);
    const isAuth = useAppSelector(state => state.auth.isAuth);
    const status = useAppSelector(state => state.profile.status);

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(getUserProfileTC(Number(id)));
        }
    }, [id]);

    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [isAuth]);

    if (Object.keys(userProfile).length === 0) {
        return <Preloader />;
    }

    return (
        <div id="content">
            <Container fixed>
                <Grid container spacing={2}>
                    <Grid item lg={3}>
                        <Avatar id={id} photo={userProfile.photos.large} />
                    </Grid>
                    <Grid item lg={9}>
                        <Paper className={css.wrap} elevation={3}>
                            <h1 className={css.name}>{userProfile.fullName}</h1>
                            <Status id={id} status={status} />

                            <p className={css.title}>User information:</p>
                            <TableContainer className={css.info}>
                                <Table aria-label="customized table">
                                    <TableBody>
                                        <TableRow className={css.row}>
                                            <TableCell component="th" scope="row">
                                                Briefly about yourself
                                            </TableCell>
                                            <TableCell>{userProfile.aboutMe}</TableCell>
                                        </TableRow>

                                        <TableRow className={css.row}>
                                            <TableCell component="th" scope="row">
                                                Looking for a job?
                                            </TableCell>
                                            <TableCell>
                                                {userProfile.lookingForAJob === true ? 'Yes' : 'No'}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className={css.row}>
                                            <TableCell component="th" scope="row">
                                                Reason for searching
                                            </TableCell>
                                            <TableCell>
                                                {userProfile.lookingForAJobDescription}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {editMode ? (
                                <SocialMedia contacts={userProfile.contacts} />
                            ) : (
                                <ProfileForm contacts={userProfile.contacts} />
                            )}
                        </Paper>

                        {userId === Number(id) && (
                            <Paper className={`${css.wrap} ${css.top}`} elevation={3}>
                                <Wall />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Profile;
