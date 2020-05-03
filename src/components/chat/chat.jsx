import React from 'react';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import spinner from '../spinner/spinner.jsx';

// ACTION CREATOR
import {SEND_MESSAGE_AC, UPDATE_MESSAGE_AC} from '../../redux/chat-reducer.js';

const Chatter = (props) => {
        return (
        <div className="chat">
            <div className="chat__user">
                <ImageLoader src={props.image} wrapper={React.createFactory('div')} preloader={spinner}></ImageLoader>
                <p className="chat__name">{props.name}</p>
            </div>
            <p className="chat__message">{props.message}</p>
        </div>
    );
}

// Презентационная компонента Chat
const Chat = (props) => {
    let userBox = props.chatData.map(item => (<Chatter key={item.id} name={item.name} image={item.image} message={item.message}/>));
    let message = React.createRef();

    let sendMessage = () => {
        props.SEND_MESSAGE_AC();
    }

    let updateMessage = () => {
        props.UPDATE_MESSAGE_AC(message.current.value); 
    }

    return (
        <div className="container">
            {userBox}
            <div className="form">
                <textarea onChange={updateMessage} value={props.newMessage} ref={message} className="form__post" 
                    placeholder="Enter your text..."/>
                <button onClick={sendMessage} className="form__submit" type="submit">SEND</button>
            </div>
        </div>
    );
}

// Контейнерная компонента Chat
let mapStateToProps = (state) => {
    return {
        chatData: state.chat.CHAT_DATA,
        newMessage: state.chat.newMessage
    }
}

const ChatBox = connect(mapStateToProps, {SEND_MESSAGE_AC, UPDATE_MESSAGE_AC})(Chat);

export default ChatBox;