import React from 'react';
import {compose} from 'redux';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// Components
import Status from './status.jsx';
import Panel from './panel.jsx';
import PostData from './postData.jsx';
import ProfileData from './profileData.jsx';
import Preloader from '../preloader/preloader.jsx';
import spinner from '../spinner/spinner.jsx';
import ProfileForm from './formData.jsx';

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

// Презентацинная компонента Profile
class Profile extends React.Component {

    state = {
        editMode: false
    }

    activateEditMode = (e) => {
        e.preventDefault();
        this.setState({
            editMode: true
        })
    }

    deActivateEditMode = (e) => {
        e.preventDefault();
        this.setState({
            editMode: false
        })
    }

    onSubmit = (formData) => {
        this.props.saveProfileTC(this.props.person.userId, formData).then(
            () => {
                this.setState({editMode: false});
            }
        )
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
                        <h1 className="title title_first">{this.props.person.fullName}</h1>
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
                        {
                            this.props.id === this.props.person.userId ? 
                            <Panel activateEditMode={this.activateEditMode} {...this.props}/> : ''
                        }
                    </div>

                    <div className="col-xl-9 col-lg-8 col-md-7 mt-5 mt-md-0">    
                        {   
                            this.state.editMode === false
                            ? <ProfileData id={this.props.id} person={this.props.person}/> 
                            : <ProfileForm 
                                onSubmit={this.onSubmit} 
                                initialValues={this.props.person} 
                                deActivateEditMode={this.deActivateEditMode}
                            />
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
        return <Profile 
                    {...this.props} 
                    id={this.props.id}
                    status={this.props.status} 
                    updateStatusTC={this.props.updateStatusTC} 
                    saveProfileTC={this.props.saveProfileTC}
                />
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