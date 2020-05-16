import React from 'react';

export const Textarea = ({input, meta, ...props}) => {

    let style = '';    
    if(meta.touched && meta.error) {
        style = 'form-control is-invalid';  
    }
    else if(meta.touched && !meta.error) {
        style = 'form-control is-valid';
    }
    else {
        style = 'form-control';
    }

    return (
        <div>
            <textarea className={style} {...input} {...props} rows='5'/>  
            <p className='valid-feedback'>Field is correct.</p>
            <p className='invalid-feedback'>Field is wrong!</p>
        </div>
    )
}

export const InputText = ({input, meta, ...props}) => {

    let style = '';    
    if(meta.touched && meta.error) {
        style = 'form-control is-invalid';  
    }
    else if(meta.touched && !meta.error) {
        style = 'form-control is-valid';
    }
    else {
        style = 'form-control';
    }

    return (
        <div>
            <input className={style} {...input} {...props} type="text"/>  
            <div className='invalid-feedback'>Field is wrong!</div>
        </div>
    )
}

export const InputPass = ({input, meta, ...props}) => {

    let style = '';    
    if(meta.touched && meta.error) {
        style = 'form-control is-invalid';  
    }
    else if(meta.touched && !meta.error) {
        style = 'form-control is-valid';
    }
    else {
        style = 'form-control';
    }

    return (
        <div>
            <input className={style} {...input} {...props} type="password"/>  
            <div className='invalid-feedback'>Field is wrong!</div>
        </div>
    )
}

export const InputCheck = ({input, meta, ...props}) => {

    let style = '';    
    if(meta.touched && meta.error) {
        style = 'form-control is-invalid';  
    }
    else if(meta.touched && !meta.error) {
        style = 'form-control is-valid';
    }
    else {
        style = 'form-control';
    }
    
    return (
        <div>
            <input className={style} {...input} {...props} type="checkbox" id="rememberMe"/>  
        </div>
    )
}