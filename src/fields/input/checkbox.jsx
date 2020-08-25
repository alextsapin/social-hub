import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

export const InputCheck = ({input, meta, ...props}) => { 
    return <Checkbox color="primary" id={input.name} {...input} {...props} type="checkbox"/>
}