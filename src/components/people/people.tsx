import React from 'react';
import {Formik, Form, Field} from 'formik';

import Person from './person';
import Pagination from '../pagination/pagination';
import Preloader from '../spinners/pageSpinner';
import stub from '../../images/stub.png';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

// Thunk creators
import {getUsersTC, pageChangeTC} from '../../redux/reducers/people';
type FilterType = {
    term: string
}

type PropsType = {
    data: Array<{
        name: string
        id: number
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
    onPageChanged: (page: number) => void
    onFilterChanged: (filter: FilterType) => void
    followTC: (id: number) => void
    unfollowTC: (id: number) => void
} 

type SearchFormType = {
    term : string
}

const SearchForm = (props: any) => {

    const formValidate = (values: any) => {
        const errors = {};
        return errors;
    }

    const submit = (values: SearchFormType, {setSubmitting}: {setSubmitting: (isSubmitting: boolean) => void}) => {
        props.onFilterChanged(values);
        setSubmitting(false);
    }

    return (
        <div>
            <p className="mb-2 font-weight-bold">Найти пользователя</p>
            <Formik initialValues={{term: ''}} validate={formValidate} onSubmit={submit}>
                {({isSubmitting}) => (
                <Form className="form-inline">
                    <div className="form-group mr-2">
                        <Field className="form-control" type="text" name="term"/>
                    </div>
                    <select className="custom-select mr-sm-3" id="inlineFormCustomSelect">
                        <option selected>Choose...</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <Button type="submit" disabled={isSubmitting} color="primary" variant="contained"><SearchIcon/></Button>
                </Form>
                )}
            </Formik>
        </div>
    )
}

const People = (props: PropsType) => {    
    return (
        <div className="mt-5 mb-5">
            <h1 className="title title_first mb-5">Всего пользователей: {props.usersTotal}</h1>
            <SearchForm onFilterChanged={props.onFilterChanged}/>
            {props.isConnect ? <Preloader/> :
                <div className="row">
                    {
                        props.data.map(item => 
                            <Person 
                                key = {item.id}
                                id = {item.id} 
                                followed = {item.followed}
                                name = {item.name}
                                image = {item.photos.small == null ? stub : item.photos.small}
                                status = {item.status}
                                followUsers = {props.followUsers}
                                isAuth = {props.isAuth}
                                followTC = {props.followTC}
                                unfollowTC = {props.unfollowTC}
                            />
                        )
                    }
                </div>
            }

            <Pagination 
                onPageChanged = {props.onPageChanged} 
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