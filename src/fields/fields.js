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
            {meta.touched && meta.error && <p className="alert alert-danger text-center">{meta.error}</p>}
            <textarea className={style} {...input} {...props} rows='5'/> 
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

    return <input className={style} {...input} {...props} type="text"/>
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

    return <input className={style} {...input} {...props} type="password"/>
}

export const InputCheck = ({input, meta, ...props}) => { 
    return <input className="form-check-input" {...input} {...props} type="checkbox"/>
}