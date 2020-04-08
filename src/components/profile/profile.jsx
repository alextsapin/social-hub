import React from 'react';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import preloader from '../preloader/preloader.jsx';

// IMG
import kaleb from '../../images/kaleb.png';

// ACTION CREATOR
import {addPostActionCreator, updatePostActionCreator} from '../../redux/state.js';

const Post = (props) => {
    return (
        <div className="post">
            <p className="post__text">{props.post}</p>
        </div>
    );
}

// Презентацинная компонента Profile
const Profile = (props) => {
    let postBox = props.postData.map(item => (<Post key={item.id} post={item.text}/>));
    let textarea = React.createRef();
    let addPost = () => {
        props.addPost();
    }
    let updatePost = () => {
        props.updatePost(textarea.current.value); 
    }

    return (
        <div id="content">
            <div className="userbox">
                <div className="userbox__user">
                    <ImageLoader src={kaleb} wrapper={React.createFactory('div')} preloader={preloader}></ImageLoader>
                    <p className="userbox__name">Jason Kaleb</p>
                </div>

                <div>
                    <p className="userbox__data"><span className="userbox__item">Age:</span> 28</p>
                    <p className="userbox__data"><span className="userbox__item">Birthday:</span> 16 june</p>
                    <p className="userbox__data"><span className="userbox__item">Living in:</span> Manchester</p>
                    <p className="userbox__data"><span className="userbox__item">Relationship:</span> Single</p>
                </div>
            </div>

            <h1>My posts:</h1>
            {postBox}
            <h2>Add new post</h2>
            <div className="form">
                <textarea onChange={updatePost} value={props.newPost} ref={textarea} className="form__post" placeholder="Enter your text..."/>
                <button onClick={addPost} className="form__submit" type="submit">SEND</button>
            </div>
        </div>
    );
}

// Контейнерная компонента Profile
let mapStateToPropsProfile = (state) => {
    return {
        postData: state.profile.postData,
        newPost: state.profile.newPost
    }
}

let mapDispatchToPropsProfile = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator());
        },
        updatePost: (newPost) => {
            dispatch(updatePostActionCreator(newPost)); 
        }
    }
}

const Profile__box = connect(mapStateToPropsProfile, mapDispatchToPropsProfile)(Profile);

export default Profile__box;