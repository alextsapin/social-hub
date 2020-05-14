import React from 'react';
import ImageLoader from 'react-imageloader';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import spinner from '../spinner/spinner.jsx';
import {requiredField, maxLength, minLength} from '../../utilities/validators.js';
import {Textarea} from '../controls/fields.js';

// Thunk creators
import {sendMessageTK} from '../../redux/reducers/chat.js';

const Chatter = (props) => {
        return (
        <div className="chat">
            <div className="row">
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
        </div>
        
    );
}

// Компонент ChatForm
const ChatForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="form">
            <Field component={Textarea} name="message" placeholder="Enter your text..." 
                validate={[requiredField, maxLength, minLength]}/>
            <button className="btn btn-lg btn-primary mt-2" type="submit">SEND</button>
        </form>
    );
}

const ChatFormRedux = reduxForm({form: 'chat'})(ChatForm);

// Презентационная компонента Chat
const Chat = (props) => {
    let userBox = props.chatData.map(item => (<Chatter key={item.id} name={item.name} image={item.image} message={item.message}/>));

    let sendMessage = (values) => {
        props.sendMessageTK(values.message);
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
        chatData: state.chat.data,
        newMessage: state.chat.newMessage
    }
}

const ChatBox = connect(mapStateToProps, {sendMessageTK})(Chat);

export default ChatBox;