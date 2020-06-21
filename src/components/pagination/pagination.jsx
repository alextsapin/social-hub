import React from 'react';

// Icons
import {ArrowLeft, ArrowDoubleLeft, ArrowRight, ArrowDoubleRight} from '../../icons/icons.js';

// Постраничная навигация
class Pagination extends React.Component {

    componentDidMount() {   
        this.props.onPageChanged(this.props.currentPage);
        this.setState({
            portionNumber: Math.ceil(this.props.currentPage / this.props.onPageUsers)
        });
    }

    state = {
        portionNumber: 1
    }

    setPortionNumberFirst() {
        this.setState({
            portionNumber: 1
        });
    }

    setPortionNumberLast() {
        this.setState({
            portionNumber: 196
        });
    }

    setPortionNumberUp() {
        this.setState({
            portionNumber: this.state.portionNumber + 1
        });
    }

    setPortionNumberDown() {
        this.setState({
            portionNumber: this.state.portionNumber - 1
        });
    }

    render() {

        // Число страниц
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.onPageUsers);
        let pages = [];

        for(let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }

        const onPortionPage = 5;

        // Крайняя левая страница
        let leftPage = (this.state.portionNumber - 1) * onPortionPage + 1;
        // Крайняя правая страница
        let rightPage = this.state.portionNumber * onPortionPage;
        // Число порций
        let portionCount = Math.ceil(pagesCount / onPortionPage);

        return (
            <div className="pagination">
                {   
                    this.state.portionNumber > 1 && 
                    <button className="pagination__link" onClick={()=> {
                        this.setPortionNumberFirst(); 
                        this.props.onPageChanged(1);}}><ArrowDoubleLeft/>
                    </button>
                }

                {  
                    this.state.portionNumber > 1 && 
                    <button className="pagination__link" onClick={()=>{
                        this.setPortionNumberDown(); 
                        this.props.onPageChanged(leftPage - 1)}}><ArrowLeft/>
                    </button>
                }
                
                {
                    pages.filter(page => page >= leftPage && page <= rightPage).map((page) => {
                        return (
                            <button onClick={() => {
                                this.props.onPageChanged(page);
                            }} 
                                className={
                                    this.props.currentPage === page && 'pagination__link pagination__link_active' || 
                                    'pagination__link'}>{page}
                            </button>
                        ); 
                    })
                }

                {
                    this.state.portionNumber < portionCount && 
                    <button className="pagination__link" onClick={()=>{
                        this.setPortionNumberUp();
                        this.props.onPageChanged(rightPage + 1);
                    }}><ArrowRight/></button>
                }

                {
                    this.state.portionNumber < portionCount && 
                    <button className="pagination__link" onClick={()=>{
                        this.setPortionNumberLast();
                        this.props.onPageChanged(pagesCount);
                    }}><ArrowDoubleRight/></button>
                }
            </div>
        );
    }
}

export default Pagination;