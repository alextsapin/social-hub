import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

// Components
import User from './user';
import ChatForm from './form';

// StateType
import {AppStateType} from '../../redux/store';

// Thunk creators
import {sendMessageTC, setUserDataTC} from '../../redux/reducers/chat';

// HOC
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

// Selectors
import {userIdSelector} from '../../redux/selectors/auth';
import {chatDataSelector, newMessageSelector} from '../../redux/selectors/chat';

type mapDispatchPropsType = {
    setUserDataTC: (id: number) => void;
    sendMessageTC: (massage: string) => void;
}

type mapStatePropsType = {
    id: any;
    chatData: Array<any>;
    newMessage: string;
}

type PropsType = mapStatePropsType & mapDispatchPropsType;

// Презентационная компонента Chat
const Chat = (props: PropsType) => {

    props.setUserDataTC(props.id);

    let userBox = props.chatData.map(item => (<User key={item.id} name={item.name} image={item.image} message={item.message}/>));

    let sendMessage = (values: any) => {
        props.sendMessageTC(values.message);
    }

    return (
        <div className="mt-5 mb-5">
            <div className="row">
                <div className="col-12">
                    {userBox}
                    <ChatForm onSubmit={sendMessage}/>
                </div>
            </div>
        </div>
    );
}

// Контейнерная компонента Chat
let mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        id: userIdSelector(state),
        chatData: chatDataSelector(state),
        newMessage: newMessageSelector(state)
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {sendMessageTC, setUserDataTC}))(Chat);