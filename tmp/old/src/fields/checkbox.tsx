import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

type PropsType = {
    input: {
        name: string
    }
    meta: {
        error: string
        touched: boolean
    }
}

export const InputCheck = (props: PropsType) => { 
    const {input, meta, ...restProps} = props;
    return <Checkbox color="primary" id={input.name} {...input} {...restProps} />
}