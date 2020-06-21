import React from 'react';
import {compose} from 'redux';
import ImageLoader from 'react-imageloader';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import spinner from '../spinner/spinner.jsx';

// Fields
import {Textarea} from '../../fields/fields.js';

// Validators
import {requiredField, maxLengthCreator, minLengthCreator} from '../../utilities/validators.js';

// Thunk creators
import {sendMessageTK, setUserDataTK} from '../../redux/reducers/chat.js';

// HOC
import {withAuthRedirect} from '../../hoc/withAuthRedirect.js';

// Selector
import {userIdSelector} from '../../redux/selectors/auth.js';

const Chatter = (props) => {
        return (
            <div className="chat row">
                <div className="col-md-3">
                    <div className="chat__user">
                        <ImageLoader src={props.image} wrapper={React.createFactory('div')} preloader={spinner}></ImageLoader>
                        <p className="chat__name">{props.name}</p>
                    </div>
                </div>
                <div className="col-md-9 d-inline-flex flex-column justify-content-center">
                    <p className="chat__message">{props.message}</p>
                </div>
            </div>
        );
}

// Максимальное и минимальное число символов
const maxLength140 = maxLengthCreator(140);
const minLength1 = minLengthCreator(1);

// Компонент ChatForm
const ChatForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="formPost">
            <Field component={Textarea} name="message" placeholder="Какой-то текст..." validate={[requiredField, maxLength140, minLength1]}/>
            <button className="btn btn-lg btn-secondary mt-2 float-right" type="submit">Отправить</button>
        </form>
    );
}

const ChatFormRedux = reduxForm({form: 'Chat'})(ChatForm);

// Презентационная компонента Chat
const Chat = (props) => {

    props.setUserDataTK(props.id);

    let userBox = props.chatData.map(item => (<Chatter key={item.id} id={item.id} name={item.name} image={item.image} message={item.message}/>));

    let sendMessage = (values) => {
        props.sendMessageTK(props.id, values.message);
    }

    return (
        <div className="mt-5 mb-5">
            <div className="row">
                <div className="col-12">
                    {userBox}
                    <ChatFormRedux onSubmit={sendMessage}/>
                </div>
            </div>
        </div>
    );
}

// Контейнерная компонента Chat
let mapStateToProps = (state) => {
    return {
        id:         userIdSelector(state),
        chatData:   state.chat.data,
        newMessage: state.chat.newMessage
    }
}

export default compose(withAuthRedirect,connect(mapStateToProps, {sendMessageTK, setUserDataTK}))(Chat);