import React from 'react';
import {compose} from 'redux';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// Components
import Status from './status.jsx';
import Avatar from './avatar.jsx';
import PostData from './postData.jsx';
import ProfileData from './profileData.jsx';
import Preloader from '../preloader/preloader.jsx';
import spinner from '../spinner/spinner.jsx';

// Redux-form
import {Field, reduxForm} from 'redux-form';

// Forms
import {requiredField, maxLengthCreator, minLengthCreator} from '../../utilities/validators.js';
import {InputText, InputCheck, Textarea} from '../../fields/fields.js';

// HOC
import {withAuthRedirect} from '../../hoc/withAuthRedirect.js';

// IMG
import stub from '../../images/stub.png';

// Thunk creators
import {
    addPostTC, 
    updatePostTC, 
    getProfileTC, 
    getStatusTC, 
    updateStatusTC, 
    setAvatarTC,
    saveProfileTC
} from '../../redux/reducers/profile.js';

// Selectors
import {statusSelector, postSelector, dataSelector, personSelector} from '../../redux/selectors/profile.js';
import {userIdSelector} from '../../redux/selectors/auth.js';

const maxLength20 = maxLengthCreator(20);
const minLength6 = minLengthCreator(6);

const ProfileForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="mt-3 form-group row">
                <div className="col-md-6">
                    <label className="font-weight-bold">Полное имя</label>
                    <Field name="fullName" component={InputText}/>
                </div>
            </div>

            <div className="mt-3 form-group row">
                <div className="col-md-6">
                    <label className="font-weight-bold">Немного о себе</label>
                    <Field name="aboutMe" component={Textarea}/>
                </div>
            </div>

            <div className="form-group form-check">
                <label className="form-check-label font-weight-bold" htmlFor="lookingForAJob">В поиске работы ?</label>
                <Field name="lookingForAJob" component={InputCheck} />
            </div>


            <div className="mt-3 form-group row">
                <div className="col-md-6">
                    <label className="font-weight-bold">Причина поиска</label>
                    <Field name="lookingForAJobDescription" component={Textarea}/>
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Сохранить</button>
        </form>
    )
}

const ProfileFormRedux = reduxForm({form: 'profile'})(ProfileForm);

// Презентацинная компонента Profile
class Profile extends React.Component {

    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    onSubmit = (formData) => {
        this.props.saveProfileTC(this.props.person.userId, formData);
        this.setState({
            editMode: false
        })
    }

    render() {

        // Заглушка, если профиль не загрузился
        if(this.props.person === null) {
            return <Preloader/>
        }

        return (
            <div className="mt-5 mb-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="person__name">{this.props.person.fullName}</h1>
                        <Status id={this.props.id} userId={this.props.person.userId} status={this.props.status} 
                        updateStatusTC={this.props.updateStatusTC}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-5">
                        <ImageLoader className="person__image" 
                            src={this.props.person.photos.large === null ? stub : this.props.person.photos.large} 
                            wrapper={React.createFactory('div')} 
                            preloader={spinner}>
                        </ImageLoader>
                        {this.props.id === this.props.person.userId ? <Avatar {...this.props}/> : ''}
                    </div>

                    <div className="col-xl-9 col-lg-8 col-md-7 mt-5 mt-md-0">    
                        {   
                            this.state.editMode === false
                            ? <ProfileData person={this.props.person} activateEditMode={this.activateEditMode}/> 
                            : <ProfileFormRedux onSubmit={this.onSubmit} initialValues={this.props.person}/>
                        }
                    </div>
                </div>
                {this.props.id === this.props.person.userId ? <PostData {...this.props}/> : ''}
            </div>
        );
    }
}

class ProfileServer extends React.Component {

    getUserData() {
        let id = this.props.match.params.id ? this.props.match.params.id : this.props.id;
        this.props.getProfileTC(id);
        this.props.getStatusTC(id);
    }

    componentDidMount() {
        this.getUserData();
    }

    // Перерисуем компонент, если изменился id
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.getUserData();
        }
    }

    render() {
        return <Profile {...this.props} status={this.props.status} updateStatusTC={this.props.updateStatusTC} 
                        saveProfileTC={this.props.saveProfileTC}/>
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state) => {
    return {
        id:      userIdSelector(state),
        data:    dataSelector(state),
        post:    postSelector(state),
        person:  personSelector(state),
        status:  statusSelector(state)
    }
}

export default compose(
    withRouter,
    withAuthRedirect,
    connect(mapStateToProps, {addPostTC, updatePostTC, getProfileTC, getStatusTC, updateStatusTC, setAvatarTC, saveProfileTC}))(ProfileServer);