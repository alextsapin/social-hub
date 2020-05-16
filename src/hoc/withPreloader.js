import React from 'react';
import {connect} from 'react-redux';
import loading from '../images/loading.gif';

let mapStateToProps = (state) => {
    return {
        profile:   state.profile.profile,
        isConnect: state.people.isConnect
    }
}

const Preloader = () => {
	return (
		<div id="content">
			<img className="preloader" src={loading} alt="preloader"/>
		</div>
	);
}

export const withPreloader = (Component) => {

    let PreloaderComponent = (props) => {
        if(props.profile === null) {
            console.log(props);
            return <Preloader />
        } else {
            return <Component {...props} />
        }
    }

    let ComponentConnect = connect(mapStateToProps)(PreloaderComponent);

    return ComponentConnect;
}