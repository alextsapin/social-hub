/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement, ChangeEvent, MouseEvent } from 'react';

import Button from '@material-ui/core/Button';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

import Post, { PostType } from '../../entities/Post/Post';
import { addPost, updatePost, deletePost, editPost } from '../../pages/Profile/profile.reducer';
import { useAppDispatch, useAppSelector } from '../../shared/hooks';

import css from './wall.module.scss';

export const Wall = (): ReactElement => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(state => state.profile.posts);
    const text = useAppSelector(state => state.profile.text);

    const addEmoji = (emoji: string) => () => {
        dispatch(updatePost(`${text}${emoji}`));
    };

    const updatePostHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        dispatch(updatePost(e.currentTarget.value));
    };

    const addPostHandler = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        const trimmed = text.trim();

        if (trimmed) {
            dispatch(addPost());
            dispatch(updatePost(''));
        }
    };

    const editPostHandler = (id: string, newText: string): void => {
        dispatch(editPost(id, newText));
    };

    const postJSXElements = posts.map((post: PostType) => (
        <Post
            key={post.id}
            id={post.id}
            message={post.message}
            deletePost={() => dispatch(deletePost(post.id))}
            editPost={(newText: string) => editPostHandler(post.id, newText)}
        />
    ));

    return (
        <div>
            {posts.length !== 0 ? (
                <p className={css.title}>My posts:</p>
            ) : (
                <p className={css.title}>No posts yet...</p>
            )}

            {postJSXElements}
            <form>
                <Textarea
                    placeholder="Type in here…"
                    className={css.indent}
                    value={text}
                    onChange={e => updatePostHandler(e)}
                    minRows={2}
                    maxRows={4}
                    startDecorator={
                        <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                                👍
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                                😍
                            </IconButton>
                            <IconButton variant="outlined" color="neutral" onClick={addEmoji('😈')}>
                                😈
                            </IconButton>
                        </Box>
                    }
                    endDecorator={
                        <Typography level="body3" sx={{ ml: 'auto' }}>
                            {text.length} character(s)
                        </Typography>
                    }
                    sx={{ minWidth: 300 }}
                />

                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addPostHandler}
                    className="mt-2 float-right"
                    type="submit"
                >
                    Add
                </Button>
            </form>
        </div>
    );
};
