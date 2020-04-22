import React from 'react';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import preloader from '../preloader/preloader.jsx';
import * as axios from 'axios';
import { withRouter } from 'react-router-dom';

// IMG
import kaleb from '../../images/kaleb.png';

// ACTION CREATOR
import {addPost, updatePost, setUserProfile} from '../../redux/profile-reducer.js';

const Post = (props) => {
    return (
        <div className="post">
            <p className="post__text">{props.post}</p>
        </div>
    );
}

// Презентацинная компонента Profile
const Profile = (props) => {

    console.log(props.profile);
    
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
                    <ImageLoader src={picture} wrapper={React.createFactory('div')} preloader={preloader}></ImageLoader>
                    <p className="userbox__name">Jason Kaleb</p>
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

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + id).then(response => {
            //this.props.toggleIsFetching(false);
            //this.props.setTotalUserCount(response.data.totalCount);
            //this.props.setUserData(response.data.items);
            this.props.setUserProfile(response.data);
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

let UrlData = withRouter(ProfileServer);

const ProfileBox = connect(mapStateToProps, {addPost, updatePost, setUserProfile})(UrlData);

export default ProfileBox;