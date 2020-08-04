import React from 'react';
import {compose} from 'redux';
import ImageLoader from 'react-imageloader';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import spinner from '../spinner/spinner';

// StateType
import {appStateType} from '../../redux/store';

// Fields
import {TextArea} from '../../fields/fields';

// Validators
import {maxLengthCreator} from '../../utilities/validators';

// Thunk creators
import {sendMessageTC, setUserDataTC} from '../../redux/reducers/chat';

// HOC
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

// Selector
import {userIdSelector} from '../../redux/selectors/auth';

type ownPropsType = {
    id: number;
    name: string;
    image: string;
    message: string;
    handleSubmit: any;
}

type mapDispatchPropsType = {
    setUserDataTC: (id: number) => void;
    sendMessageTC: (id: number, massage: string) => void;
}

type mapStatePropsType = {
    id: number;
    chatData: Array<any>;
    newMessage: string;
}

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

const Chatter = (props: ownPropsType) => {
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

// Максимальное число символов
const maxLength140 = maxLengthCreator(140);

type propsChatFormType = {
    handleSubmit: any;
}

// Компонент ChatForm
const ChatForm = (props: propsChatFormType) => {
    return (
        <form onSubmit={props.handleSubmit} className="formPost">
            <Field component={TextArea} name="message" placeholder="Какой-то текст..." validate={[maxLength140]}/>
            <button className="btn btn-lg btn-secondary mt-2 float-right" type="submit">Отправить</button>
        </form>
    );
}

const ChatFormRedux = reduxForm({form: 'Chat'})(ChatForm);

// Презентационная компонента Chat
const Chat = (props: propsType) => {

    props.setUserDataTC(props.id);

    // @ts-ignore
    let userBox = props.chatData.map(item => (<Chatter key={item.id} id={item.id} name={item.name} image={item.image} message={item.message}/>));

    let sendMessage = (values: any) => {
        props.sendMessageTC(props.id, values.message);
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
let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        id: userIdSelector(state),
        chatData: state.chat.data,
        newMessage: state.chat.newMessage
    }
}

export default compose(withAuthRedirect,connect(mapStateToProps, {sendMessageTC, setUserDataTC}))(Chat);