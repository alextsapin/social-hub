import profileReducer, {addPostAC, updatePostAC, delPostAC} from '../reducers/profile';

// Исходные данные
let state = {
    data: [
        {id:1, text:"В Китае успешно проверили российские тест-системы на коронавирус."},
        {id:2, text:"Разработана система борьбы с астеройдами."},
        {id:3, text:"В Монголии нашли нефть."}
    ],
    post: '',
    person: null,
    status: ''
}

let updateAction = updatePostAC('Facebook is social network too.');
let addAction = addPostAC();
let delAction = delPostAC(3);

// Тесты
it('New post be added', () => {
    let afterUpdateState = profileReducer(state, updateAction);
    let afterAddState = profileReducer(afterUpdateState, addAction);
    expect(afterAddState.data.length).toBe(4);
});

it('Post is correct!', () => {
    let afterUpdateState = profileReducer(state, updateAction);
    let afterAddState = profileReducer(afterUpdateState, addAction);
    expect(afterAddState.data[3].text).toBe('Facebook is social network too.');
});

it('Post was delete', () => {
    let newState = profileReducer(state, delAction);
    expect(newState.data.length).toBe(2);
});