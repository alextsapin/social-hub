import React from 'react';
import Person from './person';
import Pagination from '../pagination/pagination';
import Preloader from '../spinners/pageSpinner';

// IMG
import stub from '../../images/stub.png';

// Типы
import {peopleType, personFollowTCType, personFollowUsersType} from './type';

type propsType = peopleType & personFollowUsersType & personFollowTCType;

const People = (props: propsType) => {    
    return (
        <div className="mt-5 mb-5">
            <h1 className="title title_first mb-5">Всего пользователей: {props.usersTotal}</h1>

            {
                props.isConnect ? <Preloader/> :
                props.data.map(item => 
                    <Person 
                        key = {item.id}
                        id = {item.id} 
                        followed = {item.followed}
                        name = {item.name}
                        image = {item.photos.small == null ? stub : item.photos.small}
                        status = {item.status == null ? '.............' : item.status}
                        followUsers = {props.followUsers}
                        isAuth = {props.isAuth}
                        followTC = {props.followTC}
                        unfollowTC = {props.unfollowTC}
                    />
                )
            }

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