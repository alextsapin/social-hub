/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Textarea from '@mui/joy/Textarea';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { Img } from 'react-image';
import { useSelector } from 'react-redux';

import { AppStateType } from '../../App/store';

import css from './css.module.scss';

export type PostType = {
    id: string;
    message: string;
};

export type propsType = {
    deletePost: (id: string) => void;
    editPost: (newText: string) => void;
};

const Post = (props: PostType & propsType): ReactElement => {
    const ava = useSelector<AppStateType, null | string>(state => state.auth.avaLink);

    const [edit, setEdit] = React.useState(false);
    const [text, setText] = React.useState(props.message);

    function postDeleteHandler(id: string): void {
        props.deletePost(id);
    }

    function postEditHandler(): void {
        setEdit(true);
    }

    const onChangeHandler = (e: any): void => {
        setText(e.currentTarget.value);
    };

    const turnOffHandler = (): void => {
        props.editPost(text);
        setEdit(false);
    };

    return (
        <Grid className={css.post} container spacing={0}>
            <Grid item lg={2}>
                {ava === null ? (
                    <Skeleton variant="circular" width={70} height={70} />
                ) : (
                    <Img
                        className={css.avatar}
                        src={ava}
                        loader={<Skeleton variant="circular" width={70} height={70} />}
                        alt="img"
                    />
                )}
            </Grid>

            <Grid item lg={9}>
                {edit ? (
                    <Textarea
                        className={css.input}
                        value={text}
                        onBlur={turnOffHandler}
                        onChange={onChangeHandler}
                        minRows={3}
                        maxRows={4}
                    />
                ) : (
                    <p className={css.text}>{props.message}</p>
                )}
            </Grid>

            <Grid item lg={1}>
                <div className={css.panel}>
                    <button type="button" onClick={postEditHandler} className={css.button}>
                        <EditIcon />
                    </button>

                    <button
                        type="button"
                        onClick={() => postDeleteHandler(props.id)}
                        className={css.button}
                    >
                        <DeleteForeverIcon />
                    </button>
                </div>
            </Grid>
        </Grid>
    );
};

export default Post;
