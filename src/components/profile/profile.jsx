import React from 'react';
import ImageLoader from 'react-imageloader';
import Preloader from '../preloader/preloader.jsx';
import {connect} from 'react-redux';
import spinner from '../spinner/spinner.jsx';
import {withRouter} from 'react-router-dom';

// IMG
import stub from '../../images/stub.png';

// ACTION CREATORS
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

    // Посты пользователя
    let postBox = props.postData.map(item => (<Post key={item.id} post={item.text}/>));
    let textarea = React.createRef();

    let addPost = () => {
        props.addPost();
    }

    let updatePost = () => {
        props.updatePost(textarea.current.value); 
    }

    // Заглушка, если профиль не загрузился
    if(props.profile == null) {
        return <Preloader/>
    }

    return (
        <div className="container">
            <div className="person">
                <div className="person__profile">
                    <ImageLoader className="person__image" src={props.profile.photos.large == null ? stub : props.profile.photos.large} wrapper={React.createFactory('div')} preloader={spinner}></ImageLoader>
                </div>
                
                <div className="person__data">
                    <h1>{props.profile.fullName}</h1>
                    
                    {props.profile.aboutMe == null ? '' : <h2 className="person__status">{props.profile.aboutMe}</h2>}
                    
                    <p className="person__info">
                        <span className="person__point">Поиск работы:</span> 
                        <span className="person__item">{props.profile.lookingForAJob == false ? 'Нет' : 'Да'}</span>
                    </p>

                    <p className="person__info">
                        <span className="person__point">Facebook:</span> 
                        <span className="person__item">{props.profile.contacts.facebook == null ? '...' : props.profile.contacts.facebook}</span> 
                    </p>

                    <p className="person__info">
                        <span className="person__point">VK:</span>
                        <span className="person__item">{props.profile.contacts.vk == null ? '...' : props.profile.contacts.vk}</span> 
                    </p>

                    <p className="person__info">
                        <span className="person__point">Twitter:</span> 
                        <span className="person__item">{props.profile.contacts.twitter == null ? '...' : props.profile.contacts.twitter}</span> 
                    </p>
                </div>
            </div>

            <h1>Мои посты:</h1>
            {postBox}
            <h2>Добавить новый пост</h2>
            <div className="form">
                <textarea onChange={updatePost} value={props.newPost} ref={textarea} className="form__post" placeholder="Enter your text..."/>
                <button onClick={addPost} className="form__submit" type="submit">Добавить</button>
            </div>
        </div>
    );
}

class ProfileServer extends React.Component {

    componentDidMount() {
        let id = this.props.match.params.id;

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