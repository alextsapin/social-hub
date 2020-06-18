import React from 'react';

// Components
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
                <form className="form">
                    <textarea className="form-control" onChange={updatePost} value={props.post} ref={textarea} rows="5"
                        placeholder="Enter your text..."/>
                    <button onClick={addPost} className="btn btn-lg btn-secondary mt-2 float-right" type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default PostData;