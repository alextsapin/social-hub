import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';

type propsType = {
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
}

// Постраничная навигация
class Pagination extends React.Component<propsType, stateType> {

    componentDidMount() {   
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
                            this.props.onPageChanged(1);
                        }}>
                        <SkipPreviousIcon/>
                    </button>
                }

                {  
                    this.state.portionNumber > 1 && 
                    <button className="pagination__link" 
                        onClick={ () => {
                            this.setPortionNumberDown(); 
                            this.props.onPageChanged(leftPage - 1)
                        }}>
                        <ChevronLeftIcon/>
                    </button>
                }
                
                {
                    this.props.pages.filter(page => page >= leftPage && page <= rightPage).map((page, index) => {
                        return (
                            <button key={index} onClick={() => {
                                this.props.onPageChanged(page);
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
                            this.props.onPageChanged(rightPage + 1);
                        }}>
                        +5
                    </button>
                }

                {
                    this.state.portionNumber < this.props.portionTotal && 
                    <button className="pagination__link" 
                        onClick={() => {
                            this.setPortionNumberLast();
                            this.props.onPageChanged(this.props.pagesTotal);
                        }}>
                        <SkipNextIcon/>
                    </button>
                }
            </div>
        );
    }
}

export default Pagination;