import React from 'react';

const getStyleTextArea = (error, touched, valid, value) => {
  
    if(error) {
        return 'formPost__field form-control p-3 is-invalid';
    } else if(touched && valid && value.length > 0) {
        return 'formPost__field form-control p-3 is-valid'; 
    } else {
        return'formPost__field form-control p-3';
    }
}

const getStyleInput = (error, touched) => {
  
    if(touched && error) {
        return 'form-control is-invalid';  
    } else if(touched && !error) {
        return 'form-control is-valid';
    } else {
        return 'form-control';
    }
}

export const TextArea = (props) => {

    let style = getStyleTextArea(props.meta.error, props.meta.touched, props.meta.valid, props.input.value);

    return (
        <div>
            {props.meta.error && <p className="alert alert-danger text-center">{props.meta.error}</p>}
            <textarea className={style} {...props.input} rows='5' placeholder={props.placeholder}/> 
        </div>
    ) 
}

export const InputText = ({input, meta, ...props}) => {

    let style = getStyleInput(meta.error, meta.touched)

    return <input className={style} {...input} {...props} type="text"/>
}

export const InputPass = ({input, meta, ...props}) => {

    let style = getStyleInput(meta.error, meta.touched);

    return <input className={style} {...input} {...props} type="password"/>
}

export const InputCheck = ({input, meta, ...props}) => { 
    return <input className="form-check-input" id={input.name} {...input} {...props} type="checkbox"/>
}