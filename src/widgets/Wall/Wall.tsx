/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, { ReactElement, ChangeEvent } from 'react';

import Button from '@material-ui/core/Button';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { connect } from 'react-redux';

import { AppStateType } from '../../App/store';
import Post, { PostType } from '../../entities/Post/Post';
import { addPost, updatePost, deletePost, editPost } from '../../pages/Profile/profile.reducer';
import { getNewPostTextSL, getPostBoxSL } from '../../shared/selectors/profileSelectors';

import css from './css.module.scss';

type WallType = {
    postBox: Array<PostType>;
    newPostText: string;
    updatePost: (text: string) => void;
    addPost: () => void;
    editPost: (id: string, newText: string) => void;
    deletePost: (id: string) => void;
};

const Wall = (props: WallType): ReactElement => {
    const addEmoji = (emoji: string) => () => {
        props.updatePost(`${props.newPostText}${emoji}`);
    };

    const updatePost = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        props.updatePost(e.currentTarget.value);
    };

    const addPost = (e: any): void => {
        e.preventDefault();
        const trimmed = props.newPostText.trim();

        if (trimmed) {
            props.addPost();
            props.updatePost('');
        }
    };

    const editPostHandler = (id: string, newText: string): void => {
        props.editPost(id, newText);
    };

    const postJSXElements = props.postBox.map((item: PostType) => (
        <Post
            key={item.id}
            id={item.id}
            message={item.message}
            deletePost={() => props.deletePost(item.id)}
            editPost={(newText: string) => editPostHandler(item.id, newText)}
        />
    ));

    return (
        <div>
            {props.postBox.length !== 0 ? (
                <p className={css.title}>My posts:</p>
            ) : (
                <p className={css.title}>No posts yet...</p>
            )}

            {postJSXElements}
            <form>
                <Textarea
                    placeholder="Type in here…"
                    className={css.indent}
                    value={props.newPostText}
                    onChange={e => updatePost(e)}
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
                            {props.newPostText.length} character(s)
                        </Typography>
                    }
                    sx={{ minWidth: 300 }}
                />

                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addPost}
                    className="mt-2 float-right"
                    type="submit"
                >
                    Add
                </Button>
            </form>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const mapStateToProps = (state: AppStateType) => {
    return {
        newPostText: getNewPostTextSL(state),
        postBox: getPostBoxSL(state),
    };
};

export default connect(mapStateToProps, { addPost, updatePost, deletePost, editPost })(Wall);
