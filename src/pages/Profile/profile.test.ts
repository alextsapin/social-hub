/* eslint-disable no-magic-numbers */
import { v1 } from 'uuid';

import { profileReducer, addPost, deletePost, editPost, updatePost } from './profile.reducer';
import { StateType } from './types';

let id1: string;
let id2: string;
let id3: string;

let startState: StateType;

beforeEach(() => {
    id1 = v1();
    id2 = v1();
    id3 = v1();

    startState = {
        status: null,
        posts: [
            {
                id: id1,
                message: 'В Китае успешно проверили российские тест-системы на коронавирус.',
            },
            { id: id2, message: 'Разработана система борьбы с астеройдами.' },
            { id: id3, message: 'В Монголии нашли нефть.' },
        ],
        text: '',
        userProfile: null,
    };
});

test('New post should be added', () => {
    const endState = profileReducer(startState, addPost());

    expect(endState.posts.length).toBe(4);
});

test('Post should be deleted', () => {
    const endState = profileReducer(startState, deletePost(id3));

    expect(endState.posts.length).toBe(2);
});

test('Post should be updated', () => {
    const endState = profileReducer(startState, updatePost('New text'));

    expect(endState.text).toBe('New text');
});

test('Post should be edited', () => {
    const endState = profileReducer(startState, editPost(id1, 'New text'));

    expect(endState.posts[0].message).toBe('New text');
});
