import React from 'react';
import ImageLoader from 'react-imageloader';
import Preloader from '../preloader/preloader.jsx';
import {connect} from 'react-redux';
import spinner from '../spinner/spinner.jsx';
import {withRouter} from 'react-router-dom';

// IMG
import kaleb from '../../images/kaleb.png';
import stub from '../../images/stub-small.png';

// ACTION CREATOR
import {addPost, updatePost, setUserProfile} from '../../redux/profile-reducer.js';
// DAL
import {profileAPI} from '../../api/api.js';

const Post = (props) => {
    return (
        <div className="post">
            <p className="post__text">{props.post}</p>
        </div>
    );
}

// Презентацинная компонента Profile
const Profile = (props) => {

    if(props.profile == null) {
        return <Preloader/>
    }
    
    console.log(props);
    let postBox = props.postData.map(item => (<Post key={item.id} post={item.text}/>));
    let textarea = React.createRef();

    let addPost = () => {
        props.addPost();
    }

    let updatePost = () => {
        props.updatePost(textarea.current.value); 
    }

    let picture = '';

    if(!props.profile) {
        picture = '../../images/kaleb.png';
    }
    else {
        picture = props.profile.photos.small;
    }

    return (
        <div id="content">
            <div className="userbox">
                <div className="userbox__user">
                    <ImageLoader src={picture} wrapper={React.createFactory('div')} preloader={spinner}></ImageLoader>
                    <p className="userbox__name">User Name</p>
                </div>

                <div>
                    <p className="userbox__data">
                        <span className="userbox__item">Age:</span> 28
                    </p>
                    <p className="userbox__data">
                        <span className="userbox__item">Birthday:</span> 16 june
                    </p>
                    <p className="userbox__data">
                        <span className="userbox__item">Living in:</span> Manchester
                    </p>
                    <p className="userbox__data">
                        <span className="userbox__item">Relationship:</span> Single
                    </p>
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

class ProfileServer extends React.Component {

    componentDidMount() {
        let id = this.props.match.params.id;

        if(!id) {
            id = 2;
        }

        // Получим данные пользователя
        profileAPI(id).then(data => {
            this.props.setUserProfile(data);
        });
    }

    render() {
        return <Profile {...this.props} profile={this.props.profile}/>
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state) => {
    return {
        postData: state.profile.postData,
        newPost: state.profile.newPost,
        profile: state.profile.profile
    }
}

let ProfileData = withRouter(ProfileServer);

const ProfileBox = connect(mapStateToProps, {addPost, updatePost, setUserProfile})(ProfileData);

export default ProfileBox;