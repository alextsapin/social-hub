import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {Formik} from 'formik';

import People from './people';

// Global State Type
import {AppStateType} from '../../redux/store';

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
    pagesTotalSelector,
    getFilterSelector
} from '../../redux/selectors/people';

import {isAuthSelector} from '../../redux/selectors/auth';

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
    filter: {
        term: string
    }
    getUsersTC: (currentPage: number, onPageUsers: number, term: string) => void
    pageChangeTC: (page: number, onPageUsers: number, term: string) => void
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
} 

type FilterType = {
    term: string
}

// Презентацинная компонента Profile
class PeopleServer extends React.Component<PropsType> {

    componentDidMount() {   
        this.props.getUsersTC(this.props.currentPage, this.props.onPageUsers, '');
    }

    onPageChanged = (page: number) => {
        this.props.pageChangeTC(page, this.props.onPageUsers, this.props.filter.term)
    }

    onFilterChanged = (filter: FilterType) => {
        this.props.getUsersTC(this.props.currentPage, this.props.onPageUsers, filter.term);
    }

    render() {    
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
                onPageChanged = {this.onPageChanged}
                onFilterChanged = {this.onFilterChanged}
                followTC = {this.props.followTC}
                unfollowTC = {this.props.unfollowTC}
            />
        )
    }
}

// Контейнерная компонента Profile
let mapStateToProps = (state: AppStateType) => {
    return {
        data: peopleSelector(state),
        currentPage: currentPageSelector(state),
        pages: pagesArraySelector(state),
        filter: getFilterSelector(state),
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

export default compose<React.ComponentType>(connect(mapStateToProps, {getUsersTC, pageChangeTC, followTC, unfollowTC}))(PeopleServer);