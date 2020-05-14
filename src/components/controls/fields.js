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