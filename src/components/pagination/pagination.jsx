import React from 'react';

// Icons
import {ArrowLeft, ArrowRight} from '../../icons/icons.js';

// Постраничная навигация
class Pagination extends React.Component {

    state = {
        portionNumber: 1
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

        let pageCount = Math.ceil(this.props.count / this.props.size);
        let pages = [];

        for(let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }

        // Крайняя левая страница
        let leftPage = (this.state.portionNumber - 1) * this.props.size + 1;
        // Крайняя правая страница
        let rightPage = this.state.portionNumber * this.props.size;

        return (
            <div className="pagination">
                {   this.state.portionNumber > 1 && 
                    <button className="pagination__link" onClick={()=>{this.setPortionNumberDown()}}><ArrowLeft/></button>
                }
                {
                    pages.filter(p => p >= leftPage && p <= rightPage).map((p) => {
                        return (
                            <span onClick={() => {
                                this.props.onPageChanged(p)}} className={this.props.currentPage === p && 'pagination__link'}>{p}
                            </span>
                        ); 
                    })
                }
                {
                    this.props.count > this.state.portionNumber && 
                    <button className="pagination__link" onClick={()=>{this.setPortionNumberUp()}}>
                        <ArrowRight/>
                    </button>
                }
            </div>
        );
    }
}

export default Pagination;