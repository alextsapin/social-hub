import React from 'react';

export const Textarea = ({input, meta, ...props}) => {

    let style = 'form-control';    
    if(meta.touched && meta.error) {
        style = 'form-control is-invalid';  
    }

    return (
        <div>
            <textarea className={style} {...input} {...props} rows='5'/>  
            <div class='valid-feedback'>Looks good!</div>
            <div class='invalid-feedback'>Looks bad!</div>
        </div>
    )
}

export const InputText = ({input, meta, ...props}) => {

    let style = 'form-control';    
    if(meta.touched && meta.error) {
        style = 'form-control is-invalid';  
    }

    return (
        <div>
            <input className={style} {...input} {...props} type="text"/>  
            <div class='valid-feedback'>Looks good!</div>
            <div class='invalid-feedback'>Looks bad!</div>
        </div>
    )
}

export const InputPass = ({input, meta, ...props}) => {

    let style = 'form-control';    
    if(meta.touched && meta.error) {
        style = 'form-control is-invalid';  
    }

    return (
        <div>
            <input className={style} {...input} {...props} type="password"/>  
            <div class='valid-feedback'>Looks good!</div>
            <div class='invalid-feedback'>Looks bad!</div>
        </div>
    )
}

export const InputCheck = ({input, meta, ...props}) => {

    let style = 'form-control';    
    if(meta.touched && meta.error) {
        style = 'form-control is-invalid';  
    }

    return (
        <div>
            <input className={style} {...input} {...props} type="checkbox" id="rememberMe"/>  
            <div class='valid-feedback'>Looks good!</div>
            <div class='invalid-feedback'>Looks bad!</div>
        </div>
    )
}