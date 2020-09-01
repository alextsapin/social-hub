import React from 'react';
import {getStyleInput} from './function';

type PropsType = {
    input: {
        name: string
    }
    meta: {
        error: string
        touched: boolean
    }
}

export const InputPass = (props: PropsType) => {
    const {input, meta, ...restProps} = props;
    let style = getStyleInput(meta.error, meta.touched);
    return <input className={style} {...input} {...restProps} type="password"/>
}