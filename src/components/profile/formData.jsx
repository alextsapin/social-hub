import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {maxLengthCreator, minLengthCreator} from '../../utilities/validators.js';
import {InputText, InputCheck, TextArea} from '../../fields/fields.js';

const maxLength60 = maxLengthCreator(60);
const minLength3 = minLengthCreator(3);

const ProfileForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {props.error && <p className="alert alert-danger text-center" role="alert">{props.error}</p>}
            <div className="mt-3 form-group row">
                <div className="col-md-6">
                    <label className="font-weight-bold">Полное имя</label>
                    <Field name="fullName" component={InputText} validate={[minLength3, maxLength60]}/>
                </div>

                <div className="col-md-6">
                    <label className="font-weight-bold">Немного о себе</label>
                    <Field name="aboutMe" component={InputText} validate={[minLength3, maxLength60]}/>
                </div>
            </div>

            <div className="mt-3 form-group row">
                <div className="col-md-6">
                    <label className="font-weight-bold">Facebook</label>
                    <Field name="contacts.facebook" component={InputText} validate={[minLength3, maxLength60]}/>
                </div>

                <div className="col-md-6">
                    <label className="font-weight-bold">Website</label>
                    <Field name="contacts.website" component={InputText} validate={[minLength3, maxLength60]}/>
                </div>
            </div>

            <div className="mt-3 form-group row">
                <div className="col-md-6">
                    <label className="font-weight-bold">VK</label>
                    <Field name="contacts.vk" component={InputText} validate={[minLength3, maxLength60]}/>
                </div>

                <div className="col-md-6">
                    <label className="font-weight-bold">Twitter</label>
                    <Field name="contacts.twitter" component={InputText} validate={[minLength3, maxLength60]}/>
                </div>
            </div>

            <div className="mt-3 form-group row">
                <div className="col-md-6">
                    <label className="font-weight-bold">Instagram</label>
                    <Field name="contacts.instagram" component={InputText} validate={[minLength3, maxLength60]}/>
                </div>

                <div className="col-md-6">
                    <label className="font-weight-bold">Youtube</label>
                    <Field name="contacts.youtube" component={InputText} validate={[minLength3, maxLength60]}/>
                </div>
            </div>

            <div className="mt-3 form-group row">
                <div className="col-md-6">
                    <label className="font-weight-bold">Github</label>
                    <Field name="contacts.github" component={InputText} validate={[minLength3, maxLength60]}/>
                </div>
            </div>

            <button type="submit" className="btn btn-success">Сохранить</button>
            <button type="submit" className="btn btn-danger ml-3" onClick={props.deActivateEditMode}>Отмена</button>
        </form>
    )
}

export default reduxForm({form: 'profile'})(ProfileForm);