import React from 'react';
import {Field, reduxForm} from 'redux-form';
import Button from '@material-ui/core/Button';

// Fields
import {TextArea} from '../../fields/fields';

// Validators
import {maxLengthCreator} from '../../utilities/validators';

// Максимальное число символов
const maxLength140 = maxLengthCreator(140);

type PropsType = {
    handleSubmit: any
}

const ChatForm = (props: PropsType) => {
    return (
        <form onSubmit={props.handleSubmit} className="formPost">
            <Field component={TextArea} name="message" placeholder="Какой-то текст..." validate={[maxLength140]}/>
            <Button variant="contained" color="primary" className="mt-2 float-right" type="submit">Отправить</Button>
        </form>
    );
}

export default reduxForm({form: 'Chat'})(ChatForm);