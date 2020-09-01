import React from 'react';
import ImageLoader from 'react-imageloader';

// Components
import Status from './status';
import Panel from './panel';
import PostData from './PostData';
import ProfileData from './profileData';
import Preloader from '../spinners/pageSpinner';
import spinner from '../spinners/imageSpinner';
import ProfileForm from './profileForm';

// IMG
import stub from '../../images/stub.png';

// Type
import {PersonType} from '../../types/person';

type StateType = {
    editMode: boolean
}

type PropsType = {
    id: number
    status: string
    profileId: number
    person: PersonType

    getProfileTC: (profileId: number) => void
    saveProfileTC: (userId: number, formData: any) => any
    updateStatusTC: (status: string) => void
    setAvatarTC: (e: any) => void

    isAuth: boolean
    data: Array<{
        id: number
        text: string
    }>
    post: string
    addPostTC: (value: string) => void
    updatePostTC: (value: string) => void

}

// Презентацинная компонента Profile
class Profile extends React.Component<PropsType, StateType> {

    state = {
        editMode: false
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if(prevProps !== this.props) {
            this.props.getProfileTC(this.props.profileId);
        }
    }

    activateEditMode = (e: any) => {
        e.preventDefault();
        this.setState({
            editMode: true
        })
    }

    deActivateEditMode = (e: any) => {
        e.preventDefault();
        this.setState({
            editMode: false
        })
    }

    onSubmit = (formData: any) => {
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

export default Profile;