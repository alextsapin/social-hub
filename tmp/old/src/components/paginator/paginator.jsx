import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

// Selectors
import {
    peopleCountSelector, 
    currentPageSelector,
    peopleSelector, 
    onPageUsersSelector, 
    onPortionPageSelector,
    isConnectSelector,
    followUsersSelector,
    portionTotalSelector,
    pagesArraySelector,
    pagesTotalSelector,
    getFilterSelector
} from '../../redux/selectors/people';


/* type propsType = {
    currentPage: number;
    onPageUsers: number;
    portionTotal: number;
    onPortionPage: number;
    pages: Array<number>;
    pagesTotal: number;
    onPageChanged: (currentPage: number) => void;
}

type stateType = {
    portionNumber: number;
} */

/* const People = (props: PropsType) => {    

    const usersTotal = useSelector(peopleCountSelector);
    const currentPage = useSelector(currentPageSelector);

    return (
        <div className="mt-5 mb-5">
            <h1 className="title title_first mb-5">Всего пользователей: {usersTotal}</h1>
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
                currentPage = {currentPage} 
                pages = {props.pages}
                onPageUsers = {props.onPageUsers} 
                onPortionPage = {props.onPortionPage}
                portionTotal = {props.portionTotal}
                pagesTotal = {props.pagesTotal}
            />
        </div>
    )
} */

// Постраничная навигация
const Paginator = (props) => {
    
    const currentPage = useSelector(currentPageSelector);
    const onPageUsers = useSelector(onPageUsersSelector);
    const portionTotal = useSelector(portionTotalSelector);
    const pagesTotal = useSelector(pagesTotalSelector);

    const [portionNumber, setPortionNumber] = React.useState([1]);

    React.useEffect(() => {
        setPortionNumber([Math.ceil(currentPage / onPageUsers)])
    }, [])

    const setPortionNumberFirst = () => {
        setPortionNumber([1])
    }

    const setPortionNumberLast = () => {
        setPortionNumber([portionTotal])
    }

    const setPortionNumberUp = () => {
        setPortionNumber([+portionNumber + 1])
    }

    const setPortionNumberDown = () => {
        setPortionNumber([portionNumber - 1])
    }

    // Размер порции
    const onPortionPage = props.onPortionPage;
    // Крайняя левая страница
    let leftPage = (portionNumber - 1) * onPortionPage + 1;
    // Крайняя правая страница
    let rightPage = portionNumber * onPortionPage;
    
    console.log(portionNumber)

    return (
        <div className="pagination">
            {   
                portionNumber > 1 && 
                <button className="pagination__link" 
                    onClick={ () => {
                        setPortionNumberFirst(); 
                        props.onPageChanged(1);
                    }}>
                    <SkipPreviousIcon/>
                </button>
            }

            {  
                portionNumber > 1 && 
                <button className="pagination__link" 
                    onClick={ () => {
                        setPortionNumberDown(); 
                        props.onPageChanged(leftPage - 1)
                    }}>
                    <ChevronLeftIcon/>
                </button>
            }
            
            {
                props.pages.filter(page => page >= leftPage && page <= rightPage).map((page, index) => {
                    return (
                        <button key={index} onClick={() => {
                            props.onPageChanged(page);
                        }} 
                            className={
                                currentPage === page 
                                && 'pagination__link pagination__link_active' || 'pagination__link'}>
                                {page}
                        </button>
                    ); 
                })
            }

            {
                portionNumber < portionTotal && 
                <button className="pagination__link" 
                    onClick={() => {
                        setPortionNumberUp();
                        props.onPageChanged(rightPage + 1);
                    }}>
                    <ChevronRightIcon/>
                </button>
            }

            {
                portionNumber < portionTotal && 
                <button className="pagination__link" 
                    onClick={() => {
                        setPortionNumberLast();
                        props.onPageChanged(pagesTotal);
                    }}>
                    <SkipNextIcon/>
                </button>
            }
        </div>
    );
}

export default Paginator;