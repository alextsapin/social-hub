import React from 'react';
import {compose} from 'redux';
import ImageLoader from 'react-imageloader';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import spinner from '../spinner/spinner.jsx';


const NotFound = (props) => {

    return (
        <div className="row">
            <div className="col-12">
                <h1 className="title mt-5">404 Error! Page not found!</h1>
            </div>
        </div>
    );
}



export default NotFound;