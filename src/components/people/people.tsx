import React from 'react';

import Person from './person';
import Pagination from '../pagination/pagination';
import Preloader from '../spinners/pageSpinner';

// IMG
import stub from '../../images/stub.png';

type propsType = {
  
    followUsers: Array<number>
    followTC: (id: number) => void  
    unfollowTC: (id: number) => void
    isAuth: boolean
    isConnect: boolean
    data: Array<any>
    pageChange: (page: number) => void 
    currentPage: number
    pages: Array<number>
    onPageUsers: number
    onPortionPage: number
    usersTotal: number
    portionTotal: number
    pagesTotal: number
}

const People = (props: propsType) => {    
    return (
        <div className="mt-5 mb-5">

            <h1 className="title title_first mb-5">Всего пользователей: {props.usersTotal}</h1>

            {props.isConnect ? <Preloader/> :
            props.data.map(item => 
                <Person 
                    key = {item.id}
                    id = {item.id} 
                    followed = {item.followed}
                    name = {item.name}
                    image = {item.photos.small == null ? stub : item.photos.small}
                    status = {item.status == null ? '.............' : item.status}
                    followUsers = {props.followUsers}
                    followTC = {props.followTC}
                    unfollowTC = {props.unfollowTC}
                    isAuth = {props.isAuth}
                />
            )}

            <Pagination 
                pageChange = {props.pageChange} 
                currentPage = {props.currentPage} 
                pages = {props.pages}
                onPageUsers = {props.onPageUsers} 
                onPortionPage = {props.onPortionPage}
                portionTotal = {props.portionTotal}
                pagesTotal = {props.pagesTotal}
            />
        </div>
    )
}

export default People;