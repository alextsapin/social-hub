import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';

import People from './people';

// Global State Type
import {appStateType} from '../../redux/store';

// Thunk creators
import {getUsersTC, pageChangeTC, followTC, unfollowTC} from '../../redux/reducers/people';

// Selectors
import {
    peopleSelector, 
    onPageUsersSelector, 
    onPortionPageSelector,
    peopleCountSelector, 
    currentPageSelector,
    isConnectSelector,
    followUsersSelector,
    portionTotalSelector,
    pagesArraySelector,
    pagesTotalSelector
} from '../../redux/selectors/people';

import {isAuthSelector} from '../../redux/selectors/auth';

// Типы
import {personFollowUsersType, peopleType, personFollowTCType, peopleServerTCType} from './type';

type PropsType = {
    data: Array<{
        name: string
        id: number
        uniquerName: null
        photos: {
            small: null | string
            large: null | string
        }
        status: null | string
        followed: boolean
    }>
    currentPage: number
    pages: Array<number>
    onPageUsers: number
    onPortionPage: number
    usersTotal: number
    portionTotal: number
    pagesTotal: number
    isConnect: boolean
    isAuth: boolean
    followUsers: Array<number>
    getUsersTC: (currentPage: number, onPageUsers: number) => void
    pageChangeTC: (page: number, onPageUsers: number) => void
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
} 

// Презентацинная компонента Profile
class PeopleServer extends React.Component<PropsType> {

    componentDidMount() {   
        this.props.getUsersTC(this.props.currentPage, this.props.onPageUsers);
    }

    pageChange = (page: number) => {
        this.props.pageChangeTC(page, this.props.onPageUsers)
    }

    render() {    
        console.log(this.props); 
        return ( 
            <People 
                data = {this.props.data}
                currentPage = {this.props.currentPage}
                pages = {this.props.pages}
                onPageUsers = {this.props.onPageUsers}
                onPortionPage = {this.props.onPortionPage}
                usersTotal = {this.props.usersTotal} 
                portionTotal = {this.props.portionTotal}
                pagesTotal = {this.props.pagesTotal}
                isConnect = {this.props.isConnect}
                isAuth = {this.props.isAuth}
                followUsers = {this.props.followUsers}
                pageChange = {this.pageChange}
                followTC = {this.props.followTC}
                unfollowTC = {this.props.unfollowTC}
            />
        );
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state: appStateType) => {
    return {
        data: peopleSelector(state),
        currentPage: currentPageSelector(state),
        pages: pagesArraySelector(state),
        onPageUsers: onPageUsersSelector(state),
        onPortionPage: onPortionPageSelector(state),
        usersTotal: peopleCountSelector(state),
        portionTotal: portionTotalSelector(state),
        pagesTotal: pagesTotalSelector(state),
        isConnect: isConnectSelector(state),
        isAuth: isAuthSelector(state),
        followUsers: followUsersSelector(state)
    }
}

export default compose(connect(mapStateToProps, {getUsersTC, pageChangeTC, followTC, unfollowTC}))(PeopleServer);