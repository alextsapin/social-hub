import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

// Components
import Profile from './profile';

// HOC
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

// Thunk creators
import {
    addPostTC, 
    updatePostTC, 
    getProfileTC, 
    getStatusTC, 
    updateStatusTC, 
    setAvatarTC,
    saveProfileTC
} from '../../redux/reducers/profile';

// Selectors
import {statusSelector, postSelector, dataSelector, personSelector} from '../../redux/selectors/profile';
import {userIdSelector} from '../../redux/selectors/auth';


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
        return (
            <Profile 
                {...this.props} 
                id = {this.props.id}
                profileId = {this.props.match.params.id ? this.props.match.params.id : this.props.id}
                status = {this.props.status} 
                updateStatusTC = {this.props.updateStatusTC} 
                saveProfileTC = {this.props.saveProfileTC}
                getProfileTC = {this.props.getProfileTC}
            />
        );
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