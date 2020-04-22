import React from 'react';
import {Route, NavLink, Link} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import preloader from '../preloader/preloader.jsx';

// ACTION CREATOR
import {sendMessage, updateMessage} from '../../redux/chat-reducer.js';

const Chatter = (props) => {
    let path = "/chat/" + props.id;
    let avatar = '/images/' + props.image + '.png';
    
    return (
        <div className="chat">
            <div className="chat__user">
                <NavLink to={path}>
                    <ImageLoader src={avatar} wrapper={React.createFactory('div')} preloader={preloader}></ImageLoader>
                </NavLink>
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
        props.sendMessage();
    }

    let updateMessage = () => {
        props.updateMessage(message.current.value); 
    }

    return (
        <div id="content">
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
        chatData: state.chat.chatData,
        newMessage: state.chat.newMessage
    }
}

const ChatBox = connect(mapStateToProps, {sendMessage, updateMessage})(Chat);

export default ChatBox;