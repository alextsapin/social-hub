/* eslint-disable react/destructuring-assignment */
import React, { ReactElement } from 'react';

import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import { AppStateType } from '../../App/store';
import Post, { PostType } from '../../entities/Post/Post';
import { addPost, updatePost, deletePost, editPost } from '../../pages/Profile/profileReducer';
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
    const newPostElement = React.createRef<HTMLTextAreaElement>();

    const updatePost = (): void => {
        if (newPostElement.current) {
            props.updatePost(newPostElement.current.value);
        }
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
                <p className={css.title}>Записи на стене:</p>
            ) : (
                <p className={css.title}>Записей пока нет...</p>
            )}

            {postJSXElements}
            <form className="formPost">
                <textarea
                    ref={newPostElement}
                    onChange={updatePost}
                    value={props.newPostText}
                    className={css.textarea}
                    placeholder="Мой новый пост..."
                />
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addPost}
                    className="mt-2 float-right"
                    type="submit"
                >
                    Добавить
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
