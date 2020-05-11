import React from 'react';
import {compose} from 'redux';
import ImageLoader from 'react-imageloader';
import Preloader from '../preloader/preloader.jsx';
import {connect} from 'react-redux';
import spinner from '../spinner/spinner.jsx';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect.js';
import Status from '../status/status.jsx';

// IMG
import stub from '../../images/stub.png';

// Thunk creators
import {addPostTC, updatePostTC, getProfileTC, getStatusTC, updateStatusTC} from '../../redux/reducers/profile.js';

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
    let postBox = props.data.map(item => (<Post key={item.id} post={item.text}/>));
    let textarea = React.createRef();

    let addPost = () => {
        props.addPostTC(textarea.current.value);
    }

    let updatePost = () => {
        props.updatePostTC(textarea.current.value); 
    }

    // Заглушка, если профиль не загрузился
    if(props.profile == null) {
        return <Preloader/>
    }

    return (
        <div className="mt-5 mb-5">
            <div className="row">
                <div className="col-12">
                    <h1 className="person__name">{props.profile.fullName}</h1>
                    <Status id={props.id} status={props.status} updateStatusTC={props.updateStatusTC}/>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-5">
                    <ImageLoader className="person__image" src={props.profile.photos.large == null ? stub : props.profile.photos.large} wrapper={React.createFactory('div')} preloader={spinner}></ImageLoader>
                </div>

                <div className="col-xl-9 col-lg-8 col-md-7 mt-5 mt-md-0">    
                    <table class="table table-sm table-striped">
                        <tbody>
                            <tr>
                                <th class="font-weight-bold">Немного о себе</th>
                                <th>{props.profile.aboutMe == null ? '...' : props.profile.aboutMe}</th>
                            </tr>
                            <tr>
                                <th class="font-weight-bold">В поиске работы?</th>
                                <th>{props.profile.lookingForAJob == false ? 'нет' : 'да'}</th>
                            </tr>
                            <tr>
                                <th class="font-weight-bold">Причина поиска</th>
                                <th>{props.profile.lookingForAJobDescription == null ? '...' : props.profile.lookingForAJobDescription}</th>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Facebook</td>
                                <td>{props.profile.contacts.facebook == null ? '...' : props.profile.contacts.facebook}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">VK</td>
                                <td>{props.profile.contacts.vk == null ? '...' : props.profile.contacts.vk}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Twitter</td>
                                <td>{props.profile.contacts.twitter == null ? '...' : props.profile.contacts.twitter}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Instagram</td>
                                <td>{props.profile.contacts.instagram == null ? '...' : props.profile.contacts.instagram}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Website</td>
                                <td>{props.profile.contacts.website == null ? '...' : props.profile.contacts.website}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h1 class="title">Мои посты:</h1>
                    {postBox}
                    <h2 class="subtitle">Добавить новый пост</h2>
                    <div className="form">
                        <textarea onChange={updatePost} value={props.post} ref={textarea} className="form__post" 
                            placeholder="Enter your text..."/>
                        <button onClick={addPost} className="form__submit" type="submit">SEND</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

class ProfileServer extends React.Component {

    componentDidMount() {
        this.props.getProfileTC(this.props.match.params.id);
        this.props.getStatusTC(this.props.match.params.id);
    }

    // Перерисуем компонент, если изменился id
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getProfileTC(this.props.match.params.id);
            this.props.getStatusTC(this.props.match.params.id);
        }
    }

    render() {
        return <Profile {...this.props} status={this.props.status} updateStatusTC={this.props.updateStatusTC}/>
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state) => {
    return {
        data:    state.profile.data,
        post:    state.profile.post,
        profile: state.profile.profile,
        status:  state.profile.status
    }
}

export default compose(
    //withAuthRedirect,
    withRouter,
    connect(mapStateToProps, {addPostTC, updatePostTC, getProfileTC, getStatusTC, updateStatusTC})
)(ProfileServer);;