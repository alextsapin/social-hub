import React from 'react';

const getStyleTextArea = (error: string, touched: boolean, valid: boolean, value: string) => {
    if(error) {
        return 'formPost__field form-control p-3 is-invalid';
    } else if(touched && valid && value.length > 0) {
        return 'formPost__field form-control p-3 is-valid'; 
    } else {
        return'formPost__field form-control p-3';
    }
}

type PropsType = {
    placeholder: string
    meta: {
        error: string
        touched: boolean
        valid: boolean
    }
    input: {
        value: string
    }
}

export const TextArea = (props: PropsType) => {
    let style = getStyleTextArea(props.meta.error, props.meta.touched, props.meta.valid, props.input.value);
    return (
        <div>
            {props.meta.error && <p className="alert alert-danger text-center">{props.meta.error}</p>}
            <textarea className={style} {...props.input} placeholder={props.placeholder}/> 
        </div>
    ) 
}