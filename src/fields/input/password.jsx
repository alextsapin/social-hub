import React from 'react';
import {getStyleInput} from '../index';

export const InputPass = ({input, meta, ...props}) => {
    let style = getStyleInput(meta.error, meta.touched);
    return <input className={style} {...input} {...props} type="password"/>
}
