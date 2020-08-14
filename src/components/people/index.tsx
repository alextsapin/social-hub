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

type propsType = {

    data: Array<any>
    pagesTotal: number
    pages: Array<number>
    onPageUsers: number
    portionTotal: number
    onPortionPage: number
    usersTotal: number
    currentPage: number
    isConnect: boolean
    followUsers: Array<number>
    isAuth: boolean

    getUsersTC: (currentPage: number, onPageUsers: number) => void
    pageChangeTC: (page: number, onPageUsers: number) => void

    followTC: (id: number) => void
    unfollowTC: (id: number) => void
}


// Презентацинная компонента Profile
class PeopleServer extends React.Component<propsType> {

    componentDidMount() {   
        this.props.getUsersTC(this.props.currentPage, this.props.onPageUsers);
    }

    pageChange = (page: number) => {
        this.props.pageChangeTC(page, this.props.onPageUsers)
    }

    render() {       
        return ( 
            <People 
                data = {this.props.data}
                usersTotal = {this.props.usersTotal} 
                portionTotal = {this.props.portionTotal}
                pages = {this.props.pages}
                pagesTotal = {this.props.pagesTotal}
                onPageUsers = {this.props.onPageUsers}
                onPortionPage = {this.props.onPortionPage}
                currentPage = {this.props.currentPage}
                isConnect = {this.props.isConnect}
                pageChange = {this.pageChange}
                followUsers = {this.props.followUsers}
                followTC = {this.props.followTC}
                unfollowTC = {this.props.unfollowTC}
                isAuth = {this.props.isAuth}
            />
        );
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state: appStateType) => {
    return {
        data: peopleSelector(state),
        pagesTotal: pagesTotalSelector(state),
        pages: pagesArraySelector(state),
        onPageUsers: onPageUsersSelector(state),
        portionTotal: portionTotalSelector(state),
        onPortionPage: onPortionPageSelector(state),
        usersTotal: peopleCountSelector(state),
        currentPage: currentPageSelector(state),
        isConnect: isConnectSelector(state),
        followUsers: followUsersSelector(state),
        isAuth: isAuthSelector(state)
    }
}

export default compose(connect(mapStateToProps, {getUsersTC, pageChangeTC, followTC, unfollowTC}))(PeopleServer);