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
import {sendMessageTK} from '../../redux/reducers/chat.js';

// HOC
import {withAuthRedirect} from '../../hoc/withAuthRedirect.js';

// Selectors
import {personSelector} from '../../redux/selectors/profile.js';

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
        <form onSubmit={props.handleSubmit} className="form">
            <Field component={Textarea} name="message" placeholder="Enter your text..." validate={[requiredField, maxLength140, minLength1]}/>
            <button className="btn btn-lg btn-secondary mt-2 float-right" type="submit">Send</button>
        </form>
    );
}

const ChatFormRedux = reduxForm({form: 'Chat'})(ChatForm);

// Презентационная компонента Chat
const Chat = (props) => {

    let userBox = props.chatData.map(item => (<Chatter key={item.id} id={item.id} name={item.name} image={item.image} message={item.message}/>));

    let sendMessage = (values) => {
        props.sendMessageTK(values.message, props.person.fullName, props.person.photos.small);
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
        chatData:   state.chat.data,
        newMessage: state.chat.newMessage,
        person:     personSelector(state)
    }
}

export default compose(withAuthRedirect,connect(mapStateToProps, {sendMessageTK}))(Chat);