import React from 'react';
import Post from './post.jsx';

const PostData = (props) => {

    // Посты пользователя
    let postBox = props.data.map(item => (<Post key={item.id} post={item.text}/>));
    let textarea = React.createRef();

    let addPost = (e) => {
        e.preventDefault();
        props.addPostTC(textarea.current.value);
    }

    let updatePost = () => {
        props.updatePostTC(textarea.current.value); 
    }

    return (
        <div className="row">
            <div className="col-12">
                <h2 className="title title_first">Мои посты:</h2>
                {postBox}
                <h2 className="title title_second">Добавить новый пост</h2>
                <form className="formPost">
                    <textarea className="formPost__field form-control p-3" onChange={updatePost} value={props.post} ref={textarea} rows="5"
                        placeholder="Мой новый пост..."/>
                    <button onClick={addPost} className="btn btn-lg btn-secondary mt-2 float-right" type="submit">Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default PostData;