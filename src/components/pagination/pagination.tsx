import React from 'react';

// Icons
import {ArrowLeftIcon, ArrowDoubleLeftIcon, ArrowRightIcon, ArrowDoubleRightIcon} from '../../icons/icons';

type propsType = {
    currentPage: number;
    onPageUsers: number;
    portionTotal: number;
    onPortionPage: number;
    pages: Array<number>;
    pagesTotal: number;
    pageChange: (currentPage: number) => void;
}

type stateType = {
    portionNumber: number;
}

// Постраничная навигация
class Pagination extends React.Component<propsType, stateType> {

    componentDidMount() {   
        this.props.pageChange(this.props.currentPage);
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
            portionNumber: this.props.portionTotal
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

        // Размер порции
        const onPortionPage = this.props.onPortionPage;
        // Крайняя левая страница
        let leftPage = (this.state.portionNumber - 1) * onPortionPage + 1;
        // Крайняя правая страница
        let rightPage = this.state.portionNumber * onPortionPage;

        return (
            <div className="pagination">
                {   
                    this.state.portionNumber > 1 && 
                    <button className="pagination__link" 
                        onClick={ () => {
                            this.setPortionNumberFirst(); 
                            this.props.pageChange(1);
                        }}>
                        <ArrowDoubleLeftIcon/>
                    </button>
                }

                {  
                    this.state.portionNumber > 1 && 
                    <button className="pagination__link" 
                        onClick={ () => {
                            this.setPortionNumberDown(); 
                            this.props.pageChange(leftPage - 1)
                        }}>
                        <ArrowLeftIcon/>
                    </button>
                }
                
                {
                    this.props.pages.filter(page => page >= leftPage && page <= rightPage).map((page) => {
                        return (
                            <button onClick={() => {
                                this.props.pageChange(page);
                            }} 
                                className={
                                    this.props.currentPage === page 
                                    && 'pagination__link pagination__link_active' || 'pagination__link'}>
                                    {page}
                            </button>
                        ); 
                    })
                }

                {
                    this.state.portionNumber < this.props.portionTotal && 
                    <button className="pagination__link" 
                        onClick={() => {
                            this.setPortionNumberUp();
                            this.props.pageChange(rightPage + 1);
                        }}>
                        <ArrowRightIcon/>
                    </button>
                }

                {
                    this.state.portionNumber < this.props.portionTotal && 
                    <button className="pagination__link" 
                        onClick={() => {
                            this.setPortionNumberLast();
                            this.props.pageChange(this.props.pagesTotal);
                        }}>
                        <ArrowDoubleRightIcon/>
                    </button>
                }
            </div>
        );
    }
}

export default Pagination;