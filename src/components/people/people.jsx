import React from 'react';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';
import ImageLoader from 'react-imageloader';
import {connect} from 'react-redux';
import Pagination from '../pagination/pagination.jsx';
import Preloader from '../preloader/preloader.jsx';
import spinner from '../spinner/spinner.jsx';

// IMG
import stub from '../../images/stub.png';

// Thunk creators
import {getUsersTC, pageChangeTC, followTC, unfollowTC} from '../../redux/reducers/people.js';

// Selectors
import {peopleSelector, 
        pageSizeSelector, 
        peopleCountSelector, 
        currentPageSelector,
        isConnectSelector,
        followUsersSelector
} from '../../redux/selectors/people.js';

import {isAuthSelector} from '../../redux/selectors/auth.js';

// Icons
import {PersonPlusIcon} from '../../icons/icons.js';

const Follow = (props) => {
    if(props.followed) {
        return (
            <button disabled={props.followUsers.some(id=>id===props.id)} className="btn btn-secondary" onClick={()=>{props.unfollowTC(props.id);}}>
                <PersonPlusIcon/>
                <span>UNFOLLOW</span>
            </button>)
    } else {
        return (
            <button disabled={props.followUsers.some(id=>id===props.id)} className="btn btn-secondary" onClick={()=>{props.followTC(props.id)}}>
                <PersonPlusIcon/>
                <span>FOLLOW</span>
            </button>
        )
    }
}

const Person = (props) => {
    return (
        <div className="people__person">
            <div className="row">
                <div className="col-md-4">
                    <div className="people__avatar">
                        <NavLink to={'/profile/' + props.id}>
                            <ImageLoader className="people__image" src={props.image} wrapper={React.createFactory('div')} 
                                preloader={spinner}>
                            </ImageLoader>
                        </NavLink>
                        {props.isAuth ? <Follow {...props}/> : ''}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="people__info">
                        <NavLink className="people__name" to={'/profile/' + props.id}>{props.name}</NavLink>
                        <p className="people__status">{props.status}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const People = (props) => {
    
    return (
        <div className="mt-5 mb-5">

            <h1 className="title title_first mb-5">Всего пользователей: {props.count}</h1>

            {props.isConnect ? <Preloader/> :
            props.data.map(item => 
                <Person 
                    key            = {item.id}
                    id             = {item.id} 
                    followed       = {item.followed}
                    name           = {item.name}
                    image          = {item.photos.small == null ? stub : item.photos.small}
                    status         = {item.status == null ? '.............' : item.status}
                    followUsers    = {props.followUsers}
                    followTC       = {props.followTC}
                    unfollowTC     = {props.unfollowTC}
                    isAuth         = {props.isAuth}
                />
            )}

            <Pagination 
                onPageChanged     = {props.onPageChanged} 
                currentPage       = {props.currentPage} 
                onPageUsers       = {props.size} 
                totalUsersCount   = {props.count}
            />
        </div>
    )
}

// Презентацинная компонента Profile
class PeopleServer extends React.Component {

    componentDidMount() {   
        this.props.getUsersTC(this.props.currentPage, this.props.size);
    }

    onPageChanged = (page) => {
        this.props.pageChangeTC(page, this.props.size)
    }

    render() {
        console.log(this.props);
        
        return ( 
            <People 
                data             = {this.props.data}
                count            = {this.props.count} 
                size             = {this.props.size}
                currentPage      = {this.props.currentPage}
                isConnect        = {this.props.isConnect}
                onPageChanged    = {this.onPageChanged}
                followUsers      = {this.props.followUsers}
                followTC         = {this.props.followTC}
                unfollowTC       = {this.props.unfollowTC}
                isAuth           = {this.props.isAuth}
            />
        );
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state) => {
    return {
        data:           peopleSelector(state),
        size:           pageSizeSelector(state),
        count:          peopleCountSelector(state),
        currentPage:    currentPageSelector(state),
        isConnect:      isConnectSelector(state),
        followUsers:    followUsersSelector(state),
        isAuth:         isAuthSelector(state),
    }
}

export default compose(connect(mapStateToProps, {getUsersTC, pageChangeTC, followTC, unfollowTC}))(PeopleServer);