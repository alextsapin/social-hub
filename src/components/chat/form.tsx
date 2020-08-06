import React from 'react';
import {Field, reduxForm} from 'redux-form';

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
            <button className="btn btn-warning mt-2 float-right" type="submit">Отправить</button>
        </form>
    );
}

export default reduxForm({form: 'Chat'})(ChatForm);