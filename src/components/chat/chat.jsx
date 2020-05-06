import React from 'react';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import spinner from '../spinner/spinner.jsx';

// Action creators
import {sendMessageTK, updateMessageTK} from '../../redux/chat-reducer.js';

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
        props.sendMessageTK(message.current.value);
    }

    let updateMessage = () => {
        props.updateMessageTK(message.current.value); 
    }

    return (
        <div className="container-fluid mt-5 mb-5">
            <div className="row">
                <div className="col-12">
                    {userBox}
                    <div className="form">
                        <textarea onChange={updateMessage} value={props.newMessage} ref={message} className="form__post" 
                            placeholder="Enter your text..."/>
                        <button onClick={sendMessage} className="form__submit" type="submit">SEND</button>
                    </div>
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

const ChatBox = connect(mapStateToProps, {sendMessageTK, updateMessageTK})(Chat);

export default ChatBox;