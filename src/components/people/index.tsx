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

import {isAuthSL} from '../../redux/selectors/auth';

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
        friend: null | boolean
    }
    getUsersTC: (currentPage: number, onPageUsers: number, term: string, friend: null | boolean) => void
    pageChangeTC: (page: number, onPageUsers: number, term: string, friend: null | boolean) => void
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
} 

type FilterType = {
    term: string
    friend: null | boolean
}

// Презентацинная компонента Profile
class PeopleServer extends React.Component<PropsType> {

    componentDidMount() {   
        this.props.getUsersTC(this.props.currentPage, this.props.onPageUsers, '', null);
    }

    onPageChanged = (page: number) => {
        this.props.pageChangeTC(page, this.props.onPageUsers, this.props.filter.term, this.props.filter.friend)
    }

    onFilterChanged = (filter: FilterType) => {
        this.props.getUsersTC(this.props.currentPage, this.props.onPageUsers, filter.term, filter.friend);
    }

    render() {    
        return ( 
            <People 
                data = {this.props.data}
                pages = {this.props.pages}
                onPageUsers = {this.props.onPageUsers}
                onPortionPage = {this.props.onPortionPage}
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
        pages: pagesArraySelector(state),
        filter: getFilterSelector(state),
        onPageUsers: onPageUsersSelector(state),
        onPortionPage: onPortionPageSelector(state),
        portionTotal: portionTotalSelector(state),
        pagesTotal: pagesTotalSelector(state),
        isConnect: isConnectSelector(state),
        isAuth: isAuthSL(state),
        followUsers: followUsersSelector(state)
    }
}

export default compose<React.ComponentType>(connect(
    mapStateToProps, {
        getUsersTC, 
        pageChangeTC, 
        followTC, 
        unfollowTC
    }))(PeopleServer);