import React from 'react';
import {getStyleInput} from '../index';

export const InputText = ({input, meta, ...props}) => {
    let style = getStyleInput(meta.error, meta.touched)
    return <input className={style} {...input} {...props} type="text"/>
}